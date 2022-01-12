export class ForbiddenError extends Error {
  constructor() {
    super('Forbidden');
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
