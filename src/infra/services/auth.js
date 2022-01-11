export class AuthService {
  #authTokenGenerator;

  #passwordHashComparer;

  #passwordHasher;

  #authTokenValidator;

  #whitelistAuthTokenRepository;

  #findWhitelistedTokenRepository;

  constructor({
    authTokenGenerator,
    passwordHashComparer,
    passwordHasher,
    authTokenValidator,
    whitelistAuthTokenRepository,
    findWhitelistedTokenRepository,
  }) {
    this.#authTokenGenerator = authTokenGenerator;
    this.#passwordHashComparer = passwordHashComparer;
    this.#passwordHasher = passwordHasher;
    this.#authTokenValidator = authTokenValidator;
    this.#whitelistAuthTokenRepository = whitelistAuthTokenRepository;
    this.#findWhitelistedTokenRepository = findWhitelistedTokenRepository;
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

  async validateAuthToken(token) {
    return this.#authTokenValidator.validateAuthToken(token);
  }

  async whitelistAuthToken(token) {
    return this.#whitelistAuthTokenRepository.whitelistAuthToken(token);
  }

  async findWhitelistedToken(token) {
    return this.#findWhitelistedTokenRepository.findWhitelistedToken(token);
  }
}
