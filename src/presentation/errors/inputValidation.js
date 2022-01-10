export class InputValidationError extends Error {
  constructor(msg, data) {
    super(msg);
    this.name = this.constructor.name;
    this.data = data;
    Error.captureStackTrace(this, this.constructor);
  }
}
