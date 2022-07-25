const http_status = require("../helper/http_status_code")

class newResponse {
  constructor(
    status = http_status.OK,
    operation,
    isSucces = true,
    total_count,
    success_count,
    data = [],
    token,
    is_verified,
  ) {
    this.status = status
    this.operation = operation
    this.isSucces = isSucces
    this.total_count = total_count
    this.success_count = success_count
    this.data = data
    this.token = token
    this.is_verified = is_verified
  }
}

module.exports = newResponse