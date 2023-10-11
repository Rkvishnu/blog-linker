# EC2
variable "ec2-type" {
  default = "t2.micro"
}
variable "ec2-name" {
  default = "Jenkins-Server"
}

# Region
variable "region" {
  default = "ap-south-1"
}
variable "availability_zone" {
  default = "ap-south-1a"
}

variable "vpc_cidr_block" {}
variable "private_subnet_cidr_blocks" {}
variable "public_subnet_cidr_blocks" {}