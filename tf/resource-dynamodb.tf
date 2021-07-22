resource "aws_dynamodb_table" "main" {
  name           = "gpupricestats"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "dateTime"
  range_key      = "source"

  attribute {
    name = "dateTime"
    type = "S"
  }

  attribute {
    name = "source"
    type = "S"
  }

  tags = {
    Name        = "gpupricestats"
  }
}