variable "aws_profile" {
  type        = string
  description = "AWS CLI/SDK profile name"
  default     = "dongik2"
}

variable "aws_region" {
  type        = string
  description = "AWS region"
  default     = "ap-northeast-2"
}

variable "aws_account_id" {
  type        = string
  description = "AWS account ID"
  default     = "863518440691"
}

variable "environment" {
  type        = string
  description = "Environment name"
  default     = "dev"
}

variable "lambda_image_tag" {
  type        = string
  description = "Container image tag in ECR for Lambda"
  default     = "latest"
}

variable "lambda_timeout_seconds" {
  type        = number
  description = "Lambda timeout in seconds"
  default     = 30
}

variable "lambda_memory_mb" {
  type        = number
  description = "Lambda memory size in MB"
  default     = 1024
}

variable "lambda_architecture" {
  type        = string
  description = "Lambda architecture (arm64 or x86_64)"
  default     = "arm64"
}

variable "deploy_lambda" {
  type        = bool
  description = "Whether to create the Lambda function (set true after image is pushed to ECR)"
  default     = false
}

variable "originals_prefix" {
  type        = string
  description = "Prefix in originals bucket that should trigger image processing"
  default     = "notion-originals/"
}

variable "image_target_widths" {
  type        = string
  description = "Comma-separated target widths passed to Lambda"
  default     = "640"
}

variable "cloudfront_price_class" {
  type        = string
  description = "CloudFront price class"
  default     = "PriceClass_200"
}
