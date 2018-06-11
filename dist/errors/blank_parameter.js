"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BlankParameterError extends Error {
    constructor(message) {
        super(`Parameter parsing found it to be blank: ${message}`);
        this.message = message;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.BlankParameterError = BlankParameterError;
;
