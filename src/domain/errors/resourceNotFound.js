export class ResourceNotFoundError extends Error {
  constructor() {
    super('Resource not found.');
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
