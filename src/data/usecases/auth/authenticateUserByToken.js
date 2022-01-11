import { InvalidCredentialsError } from '../../../domain/errors';

export class AuthenticateUserByTokenUseCase {
  #authService;

  #userRepository;

  constructor({ authService, userRepository }) {
    this.#authService = authService;
    this.#userRepository = userRepository;
  }

  async authenticateUserByToken(token) {
    const { isValid, data } = await this.#authService.validateAuthToken(token);

    if (!isValid) {
      throw new InvalidCredentialsError();
    }

    const user = await this.#userRepository.findById(data?.user.id);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    return user;
  }
}
