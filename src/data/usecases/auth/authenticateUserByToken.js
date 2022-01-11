import { InvalidCredentialsError } from '../../../domain/errors';

export class AuthenticateUserByTokenUseCase {
  #authService;

  constructor({ authService }) {
    this.#authService = authService;
  }

  async authenticateUserByToken(token) {
    const { isValid } = await this.#authService.validateAuthToken(token);

    if (!isValid) {
      throw new InvalidCredentialsError();
    }

    const user = await this.#authService.findUserByToken(token);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    return user;
  }
}
