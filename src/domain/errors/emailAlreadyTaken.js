export class EmailAlreadyTakenError extends Error {
  constructor() {
    super('Email already taken.');
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
