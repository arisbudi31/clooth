const {statusCode, statusMessage} = require('./http-status')

class createResponse {
    constructor(
        status = statusCode.OK,
        message = statusMessage.OK,
        operation,
        get_data,
        total_data,
        data = []
    )
    {
        this.status = status,
        this.message = message,
        this.operation = operation,
        this.get_data = get_data,
        this.total_data = total_data,
        this.data = data
    }
}

module.exports = createResponse