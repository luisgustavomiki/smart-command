export class ParameterError extends Error {
  constructor (public readonly message: string, public readonly parameter: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
};
