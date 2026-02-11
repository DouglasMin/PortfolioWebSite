locals {
  name_prefix = "portfolio-${var.environment}"

  originals_bucket_name = "${local.name_prefix}-blog-originals-${var.aws_account_id}"
  processed_bucket_name = "${local.name_prefix}-blog-processed-${var.aws_account_id}"

  lambda_function_name = "${local.name_prefix}-blog-image-processor"
  ecr_repository_name  = "${local.name_prefix}/blog-image-processor"

  lambda_image_uri = "${aws_ecr_repository.blog_image_processor.repository_url}:${var.lambda_image_tag}"
}

resource "aws_ecr_repository" "blog_image_processor" {
  name                 = local.ecr_repository_name
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_lifecycle_policy" "blog_image_processor" {
  repository = aws_ecr_repository.blog_image_processor.name

  policy = jsonencode({
    rules = [
      {
        rulePriority = 1
        description  = "Keep recent images"
        selection = {
          tagStatus   = "any"
          countType   = "imageCountMoreThan"
          countNumber = 20
        }
        action = {
          type = "expire"
        }
      }
    ]
  })
}

resource "aws_s3_bucket" "blog_originals" {
  bucket = local.originals_bucket_name
}

resource "aws_s3_bucket" "blog_processed" {
  bucket = local.processed_bucket_name
}

resource "aws_s3_bucket_versioning" "blog_originals" {
  bucket = aws_s3_bucket.blog_originals.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_versioning" "blog_processed" {
  bucket = aws_s3_bucket.blog_processed.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_public_access_block" "blog_originals" {
  bucket = aws_s3_bucket.blog_originals.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_public_access_block" "blog_processed" {
  bucket = aws_s3_bucket.blog_processed.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_server_side_encryption_configuration" "blog_originals" {
  bucket = aws_s3_bucket.blog_originals.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "blog_processed" {
  bucket = aws_s3_bucket.blog_processed.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_cloudwatch_log_group" "blog_image_processor" {
  name              = "/aws/lambda/${local.lambda_function_name}"
  retention_in_days = 14
}

data "aws_iam_policy_document" "lambda_assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "blog_image_processor" {
  name               = "${local.lambda_function_name}-role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role.json
}

resource "aws_iam_role_policy_attachment" "lambda_basic_execution" {
  role       = aws_iam_role.blog_image_processor.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

data "aws_iam_policy_document" "blog_image_processor" {
  statement {
    sid    = "ReadOriginals"
    effect = "Allow"

    actions = [
      "s3:GetObject",
      "s3:ListBucket"
    ]

    resources = [
      aws_s3_bucket.blog_originals.arn,
      "${aws_s3_bucket.blog_originals.arn}/*"
    ]
  }

  statement {
    sid    = "WriteProcessed"
    effect = "Allow"

    actions = [
      "s3:GetObject",
      "s3:PutObject",
      "s3:DeleteObject",
      "s3:ListBucket"
    ]

    resources = [
      aws_s3_bucket.blog_processed.arn,
      "${aws_s3_bucket.blog_processed.arn}/*"
    ]
  }
}

resource "aws_iam_role_policy" "blog_image_processor" {
  name   = "${local.lambda_function_name}-s3-policy"
  role   = aws_iam_role.blog_image_processor.id
  policy = data.aws_iam_policy_document.blog_image_processor.json
}

resource "aws_lambda_function" "blog_image_processor" {
  count = var.deploy_lambda ? 1 : 0

  function_name = local.lambda_function_name
  role          = aws_iam_role.blog_image_processor.arn
  architectures = [var.lambda_architecture]

  package_type = "Image"
  image_uri    = local.lambda_image_uri
  timeout      = var.lambda_timeout_seconds
  memory_size  = var.lambda_memory_mb

  environment {
    variables = {
      ORIGINAL_BUCKET  = aws_s3_bucket.blog_originals.bucket
      PROCESSED_BUCKET = aws_s3_bucket.blog_processed.bucket
      TARGET_WIDTHS    = var.image_target_widths
    }
  }

  depends_on = [
    aws_cloudwatch_log_group.blog_image_processor,
    aws_iam_role_policy_attachment.lambda_basic_execution,
    aws_iam_role_policy.blog_image_processor
  ]
}

resource "aws_lambda_permission" "allow_s3_invoke" {
  count = var.deploy_lambda ? 1 : 0

  statement_id  = "AllowExecutionFromS3Originals"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.blog_image_processor[0].function_name
  principal     = "s3.amazonaws.com"
  source_arn    = aws_s3_bucket.blog_originals.arn
}

resource "aws_s3_bucket_notification" "originals_to_lambda" {
  count  = var.deploy_lambda ? 1 : 0
  bucket = aws_s3_bucket.blog_originals.id

  lambda_function {
    lambda_function_arn = aws_lambda_function.blog_image_processor[0].arn
    events              = ["s3:ObjectCreated:*"]
    filter_prefix       = var.originals_prefix
  }

  depends_on = [aws_lambda_permission.allow_s3_invoke]
}

resource "aws_cloudfront_origin_access_control" "processed_assets" {
  name                              = "${local.name_prefix}-processed-assets-oac"
  description                       = "OAC for processed blog assets"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "processed_assets" {
  enabled             = true
  comment             = "${local.name_prefix} processed blog assets"
  default_root_object = ""
  price_class         = var.cloudfront_price_class

  origin {
    domain_name              = aws_s3_bucket.blog_processed.bucket_regional_domain_name
    origin_id                = "processed-assets-s3"
    origin_access_control_id = aws_cloudfront_origin_access_control.processed_assets.id
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "processed-assets-s3"

    compress               = true
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    min_ttl     = 0
    default_ttl = 86400
    max_ttl     = 31536000
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

data "aws_iam_policy_document" "processed_bucket_policy" {
  statement {
    sid    = "AllowCloudFrontReadProcessedAssets"
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    actions = ["s3:GetObject"]

    resources = [
      "${aws_s3_bucket.blog_processed.arn}/*"
    ]

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.processed_assets.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "processed_assets" {
  bucket = aws_s3_bucket.blog_processed.id
  policy = data.aws_iam_policy_document.processed_bucket_policy.json
}
