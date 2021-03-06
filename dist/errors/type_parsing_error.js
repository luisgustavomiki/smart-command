"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TypeParsingError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.TypeParsingError = TypeParsingError;
;
