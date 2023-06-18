data "aws_route53_zone" "route53" {
  name = "ryohei-takagi.me"
  private_zone = false
}

data "aws_acm_certificate" "acm" {
  provider = aws.virginia
  domain = data.aws_route53_zone.route53.name
  types = ["AMAZON_ISSUED"]
}

data "aws_acm_certificate" "acm_tokyo" {
  domain = data.aws_route53_zone.route53.name
  types = ["AMAZON_ISSUED"]
}

data "aws_s3_bucket" "log_bucket" {
  bucket = "ryohei-takagi-logs"
}

data "aws_api_gateway_rest_api" "api" {
  name = "ryohei-takagi-me-api-production"
}

resource "aws_s3_bucket" "s3" {
  bucket = "ryohei-takagi.me"
}

resource "aws_s3_bucket_acl" "s3" {
  bucket = aws_s3_bucket.s3.id
  acl = "public-read"
}

resource "aws_s3_bucket_policy" "s3" {
  bucket = aws_s3_bucket.s3.id
  policy = <<POLICY
{
  "Version": "2008-10-17",
  "Statement": [
    {
      "Sid": "PublicReadForGetBucketObjects",
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": "s3:GetObject",
      "Resource": "${aws_s3_bucket.s3.arn}/*"
    }
  ]
}
POLICY
}

resource "aws_s3_bucket_website_configuration" "s3" {
  bucket = aws_s3_bucket.s3.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

resource "aws_s3_bucket_logging" "s3" {
  bucket = aws_s3_bucket.s3.id

  target_bucket = data.aws_s3_bucket.log_bucket.id
  target_prefix = "ryohei-takagi.me/s3"
}

resource "aws_cloudfront_distribution" "cloudfront" {
  enabled = true
  is_ipv6_enabled = true
  price_class = "PriceClass_All"
  http_version = "http2"

  default_root_object = "index.html"

  aliases = [data.aws_route53_zone.route53.name]

  origin {
    domain_name = "${aws_s3_bucket.s3.bucket}.s3-website-ap-northeast-1.amazonaws.com"
    origin_id = "s3"

    custom_origin_config {
      http_port = 80
      https_port = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols = [
        "TLSv1", "TLSv1.1", "TLSv1.2"
      ]
    }
  }

  default_cache_behavior {
    allowed_methods = ["GET", "HEAD", "OPTIONS"]
    cached_methods = ["GET", "HEAD"]
    target_origin_id = "s3"
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = false
    acm_certificate_arn = data.aws_acm_certificate.acm.arn
    minimum_protocol_version = "TLSv1.1_2016"
    ssl_support_method = "sni-only"
  }

  logging_config {
    bucket = "${data.aws_s3_bucket.log_bucket.bucket}.s3.amazonaws.com"
    prefix = "ryohei-takagi.me/cloudfront"
  }
}

resource "aws_route53_record" "cloudfront" {
  name = "ryohei-takagi.me"
  type = "A"
  zone_id = data.aws_route53_zone.route53.id

  alias {
    evaluate_target_health = false
    name = aws_cloudfront_distribution.cloudfront.domain_name
    zone_id = aws_cloudfront_distribution.cloudfront.hosted_zone_id
  }
}

resource "aws_api_gateway_domain_name" "api" {
  domain_name = "api.ryohei-takagi.me"
  regional_certificate_arn = data.aws_acm_certificate.acm_tokyo.arn

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

resource "aws_route53_record" "api" {
  name = aws_api_gateway_domain_name.api.domain_name
  type = "A"
  zone_id = data.aws_route53_zone.route53.id

  alias {
    evaluate_target_health = false
    name = aws_api_gateway_domain_name.api.regional_domain_name
    zone_id = aws_api_gateway_domain_name.api.regional_zone_id
  }
}

resource "aws_api_gateway_base_path_mapping" "api" {
  api_id = data.aws_api_gateway_rest_api.api.id
  stage_name = "production"
  domain_name = aws_api_gateway_domain_name.api.domain_name
}
