provider "aws" {
  region  = "ap-northeast-1"
  profile = "ryohei-takagi"

  default_tags {
    tags = {
      ManagedBy = "terraform"
      GitRepository = "ryohei-takagi/MySite"
    }
  }
}

provider "aws" {
  alias = "virginia"

  region  = "us-east-1"
  profile = "ryohei-takagi"

  default_tags {
    tags = {
      ManagedBy = "terraform"
      GitRepository = "ryohei-takagi/MySite"
    }
  }
}
