export class AuthService {
  #authTokenGenerator;

  #passwordHashComparer;

  #passwordHasher;

  #authTokenValidator;

  #whitelistAuthTokenRepository;

  #findWhitelistedTokenRepository;

  #blacklistAuthTokenRepository;

  constructor({
    authTokenGenerator,
    passwordHashComparer,
    passwordHasher,
    authTokenValidator,
    whitelistAuthTokenRepository,
    findWhitelistedTokenRepository,
    blacklistAuthTokenRepository,
  }) {
    this.#authTokenGenerator = authTokenGenerator;
    this.#passwordHashComparer = passwordHashComparer;
    this.#passwordHasher = passwordHasher;
    this.#authTokenValidator = authTokenValidator;
    this.#whitelistAuthTokenRepository = whitelistAuthTokenRepository;
    this.#findWhitelistedTokenRepository = findWhitelistedTokenRepository;
    this.#blacklistAuthTokenRepository = blacklistAuthTokenRepository;
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

  async validateAuthToken(token) {
    const validation = await this.#authTokenValidator.validateAuthToken(token);
    const whitelistedToken =
      await this.#findWhitelistedTokenRepository.findWhitelistedToken(token);

    validation.isValid = validation.isValid && whitelistedToken?.length > 0;

    return validation;
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

  /* istanbul ignore next */
  async blacklistAuthToken(token) {
    return this.#blacklistAuthTokenRepository.blacklistAuthToken(token);
  }
}
