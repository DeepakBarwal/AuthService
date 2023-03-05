const { StatusCodes } = require("http-status-codes");

const AppErrors = require("./error-handler");

class ClientError extends AppErrors {
    constructor(
        name, 
        message = 'Not able to validate data sent in this request', 
        explanation, 
        statusCode = StatusCodes.BAD_REQUEST
    ) {
        super(
            name,
            message,
            explanation,
            statusCode
        );
    }
}

module.exports = ClientError;