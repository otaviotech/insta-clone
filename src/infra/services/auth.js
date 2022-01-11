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

  /* istanbul ignore next */
  async generateAuthToken(payload) {
    return this.#authTokenGenerator.generateAuthToken(payload);
  }

  /* istanbul ignore next */
  async comparePasswords(left, right) {
    return this.#passwordHashComparer.comparePasswords(left, right);
  }

  /* istanbul ignore next */
  async hashPassword(password) {
    return this.#passwordHasher.hashPassword(password);
  }

  /* istanbul ignore next */
  async validateAuthToken(token) {
    return this.#authTokenValidator.validateAuthToken(token);
  }

  async whitelistAuthToken(token) {
    const { data } = await this.validateAuthToken(token);

    return this.#whitelistAuthTokenRepository.whitelistAuthToken(
      token,
      data.exp,
    );
  }

  /* istanbul ignore next */
  async findWhitelistedToken(token) {
    return this.#findWhitelistedTokenRepository.findWhitelistedToken(token);
  }
}
