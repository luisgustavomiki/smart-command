"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidParameterError extends Error {
    constructor(message) {
        super(`Parameter parsing could not resolve string to a valid value: ${message}`);
        this.message = message;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.InvalidParameterError = InvalidParameterError;
;
