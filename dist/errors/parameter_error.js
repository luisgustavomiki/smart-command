"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ParameterError extends Error {
    constructor(message, parameter) {
        super(message);
        this.message = message;
        this.parameter = parameter;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ParameterError = ParameterError;
;
