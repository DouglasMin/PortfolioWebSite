output "name_prefix" {
  value       = local.name_prefix
  description = "Common name prefix for resources"
}

output "ecr_repository_url" {
  value       = aws_ecr_repository.blog_image_processor.repository_url
  description = "ECR repository URL for blog image processor Lambda"
}

output "lambda_function_name" {
  value       = try(aws_lambda_function.blog_image_processor[0].function_name, null)
  description = "Lambda function name"
}

output "lambda_image_uri" {
  value       = local.lambda_image_uri
  description = "Lambda image URI currently configured"
}

output "s3_originals_bucket" {
  value       = aws_s3_bucket.blog_originals.bucket
  description = "S3 bucket for original blog assets"
}

output "s3_processed_bucket" {
  value       = aws_s3_bucket.blog_processed.bucket
  description = "S3 bucket for processed blog assets"
}

output "cloudfront_processed_domain_name" {
  value       = aws_cloudfront_distribution.processed_assets.domain_name
  description = "CloudFront domain for processed assets"
}
