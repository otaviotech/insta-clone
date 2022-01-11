import { InvalidCredentialsError } from '../../../domain/errors';

export class AuthenticateUserByTokenUseCase {
  #findUserByTokenRepository;

  #authTokenValidator;

  constructor({ findUserByTokenRepository, authTokenValidator }) {
    this.#findUserByTokenRepository = findUserByTokenRepository;
    this.#authTokenValidator = authTokenValidator;
  }

  async authenticateUserByToken(token) {
    const { isValid } = await this.#authTokenValidator.validateAuthToken(token);

    if (!isValid) {
      throw new InvalidCredentialsError();
    }

    const user = await this.#findUserByTokenRepository.findUserByToken(token);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    return user;
  }
}
