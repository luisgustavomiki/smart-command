import { ParameterError } from "./parameter_error";

export class BlankParameterError extends ParameterError {
  constructor (public readonly message: string, public readonly parameter: string) {
    super(`Parameter parsing found it to be blank: ${message}`, parameter);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
};
