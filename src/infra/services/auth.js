export class AuthService {
  #authTokenGenerator;

  #passwordHashComparer;

  #passwordHasher;

  constructor({ authTokenGenerator, passwordHashComparer, passwordHasher }) {
    this.#authTokenGenerator = authTokenGenerator;
    this.#passwordHashComparer = passwordHashComparer;
    this.#passwordHasher = passwordHasher;
  }

  async generateAuthToken(payload) {
    return this.#authTokenGenerator.generateAuthToken(payload);
  }

  async comparePasswords(left, right) {
    return this.#passwordHashComparer.comparePasswords(left, right);
  }

  async hashPassword(password) {
    return this.#passwordHasher.hashPassword(password);
  }
}
