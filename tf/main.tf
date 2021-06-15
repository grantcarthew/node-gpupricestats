terraform {
  backend "remote" {
    organization = "grantcarthew"
    workspaces {
      name = "gpupricestats"
    }
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}