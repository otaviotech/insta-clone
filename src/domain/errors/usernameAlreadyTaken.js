export class UsernameAlreadyTakenError extends Error {
  constructor() {
    super('Username already taken.');
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
