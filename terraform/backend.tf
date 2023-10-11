terraform {
  backend "s3" {
    bucket = "bucket-xyz01"
    region = "ap-south-1"
    key = "eks/terraform.tfstate"
  }
}
