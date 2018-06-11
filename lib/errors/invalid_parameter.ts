export class InvalidParameterError extends Error {
  constructor (public readonly message: string) {
    super(`Parameter parsing could not resolve string to a valid value: ${message}`);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
};
