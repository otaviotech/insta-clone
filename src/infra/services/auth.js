export class AuthService {
  #authTokenGenerator;

  #passwordHashComparer;

  #passwordHasher;

  #authTokenValidator;

  #whitelistAuthTokenRepository;

  #findWhitelistedTokenRepository;

  #userRepository;

  constructor({
    authTokenGenerator,
    passwordHashComparer,
    passwordHasher,
    authTokenValidator,
    whitelistAuthTokenRepository,
    findWhitelistedTokenRepository,
    userRepository,
  }) {
    this.#authTokenGenerator = authTokenGenerator;
    this.#passwordHashComparer = passwordHashComparer;
    this.#passwordHasher = passwordHasher;
    this.#authTokenValidator = authTokenValidator;
    this.#whitelistAuthTokenRepository = whitelistAuthTokenRepository;
    this.#findWhitelistedTokenRepository = findWhitelistedTokenRepository;
    this.#userRepository = userRepository;
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

  async whitelistAuthTokenRepository(token) {
    return this.#whitelistAuthTokenRepository.whitelistAuthToken(token);
  }

  async findWhitelistedToken(token) {
    return this.#findWhitelistedTokenRepository.findWhitelistedToken(token);
  }
}
