resource "aws_dynamodb_table" "basic-dynamodb-table" {
  name           = "gpupricestats"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "dateTime"

  attribute {
    name = "dateTime"
    type = "S"
  }

  tags = {
    Name        = "gpupricestats"
  }
}