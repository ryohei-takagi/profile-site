terraform {
  required_version = ">= 1.1.2"
  backend "s3" {
    region  = "ap-northeast-1"
    encrypt = true

    bucket = "ryohei-takagi-terraform"
    key    = "mysite/terraform.tfstate"

    profile = "ryohei-takagi"
  }

  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = ">= 4.5.0"
    }
  }
}
