export class BlankParameterError extends Error {
  constructor (public readonly message: string) {
    super(`Parameter parsing found it to be blank: ${message}`);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
};
