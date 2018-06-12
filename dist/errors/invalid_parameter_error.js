"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parameter_error_1 = require("./parameter_error");
class InvalidParameterError extends parameter_error_1.ParameterError {
    constructor(message, parameter) {
        super(`Parameter parsing could not resolve string to a valid value: ${message}`, parameter);
        this.message = message;
        this.parameter = parameter;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.InvalidParameterError = InvalidParameterError;
;
