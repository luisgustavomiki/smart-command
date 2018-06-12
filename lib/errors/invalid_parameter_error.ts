import { ParameterError } from "./parameter_error";

export class InvalidParameterError extends ParameterError {
  constructor (public readonly message: string, public readonly parameter: string) {
    super(`Parameter parsing could not resolve string to a valid value: ${message}`, parameter);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
};
