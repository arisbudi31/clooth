const {statusCode, statusMessage} = require('./http-status')

class createError {
    constructor (httpStatusCode = statusCode.INTERNAL_SERVICE_ERROR, message = statusMessage.INTERNAL_SERVICE_ERROR) {
        this.status = httpStatusCode
        this.message = message
    }
}

module.exports = createError