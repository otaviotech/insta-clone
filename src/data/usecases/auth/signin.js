import { InvalidCredentialsError } from '../../../domain/errors';

export class SignInUseCase {
  #profileRepository;

  #userRepository;

  #authService;

  constructor({ profileRepository, userRepository, authService }) {
    this.#profileRepository = profileRepository;
    this.#userRepository = userRepository;
    this.#authService = authService;
  }

  async signin(input) {
    let profile = await this.#profileRepository.findByEmail(input.identifier);

    if (!profile) {
      profile = await this.#profileRepository.findByUsername(input.identifier);
    }

    if (!profile) {
      throw new InvalidCredentialsError();
    }

    const user = await this.#userRepository.findByProfileId(profile.id);

    const passwordsMatch = await this.#authService.comparePasswords(
      input.password,
      user?.password || '',
    );

    if (!passwordsMatch) {
      throw new InvalidCredentialsError();
    }

    const token = this.#authService.generateAuthToken({ id: user?.id });

    await this.#authService.whitelistAuthToken(token);

    return token;
  }
}
