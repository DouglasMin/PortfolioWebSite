# Infrastructure (Terraform IaC)

This folder contains all AWS infrastructure code for the portfolio blog pipeline.

## Mandatory conventions

- Provisioning is Terraform-only (no clickops).
- Lambda is container-image based only (Docker -> ECR -> Lambda Image URI).
- Do NOT upload zip packages to Lambda.
- AWS CLI commands must include `--profile dongik2`.
- Target AWS account ID: `863518440691`.

## Layout

- `environments/dev`: Root Terraform stack for development.
- `modules`: Reusable Terraform modules.

## Provisioned resources (dev)

- ECR repository for Lambda image
- S3 bucket for original uploaded assets
- S3 bucket for processed assets
- IAM role/policy for Lambda
- CloudWatch log group
- Lambda function (container image, gated by `deploy_lambda`)
- S3 originals -> Lambda trigger
- CloudFront distribution for processed assets (private S3 + OAC)

## Command order (run in this order)

1. Verify AWS identity

```bash
aws sts get-caller-identity --profile dongik2
```

2. Terraform init

```bash
terraform -chdir=iac/environments/dev init
```

3. Apply base infra first (`deploy_lambda=false`): ECR + S3 + IAM + CloudFront

```bash
terraform -chdir=iac/environments/dev apply -var-file=terraform.tfvars
```

4. Login to ECR

```bash
aws ecr get-login-password --region ap-northeast-2 --profile dongik2 \
  | docker login --username AWS --password-stdin 863518440691.dkr.ecr.ap-northeast-2.amazonaws.com
```

5. Build Lambda container image

```bash
docker build -t portfolio-blog-image-processor:latest \
  -f lambda/blog-image-processor/Dockerfile \
  lambda/blog-image-processor
```

6. Tag image for ECR

```bash
docker tag portfolio-blog-image-processor:latest \
  863518440691.dkr.ecr.ap-northeast-2.amazonaws.com/portfolio-dev/blog-image-processor:latest
```

7. Push image to ECR

```bash
docker push 863518440691.dkr.ecr.ap-northeast-2.amazonaws.com/portfolio-dev/blog-image-processor:latest
```

8. Enable Lambda deploy

Edit `iac/environments/dev/terraform.tfvars`:

```hcl
deploy_lambda = true
```

9. Apply again (creates Lambda + S3 event trigger)

```bash
terraform -chdir=iac/environments/dev apply -var-file=terraform.tfvars
```

10. Check outputs (bucket names, cloudfront domain)

```bash
terraform -chdir=iac/environments/dev output
```
