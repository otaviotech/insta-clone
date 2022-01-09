import {
  EmailAlreadyTakenError,
  UsernameAlreadyTakenError,
} from '../../../domain/errors';

import { User } from '../../../domain/entities/user';

export class SignUpUseCase {
  #paswordHasher;

  #profileRepository;

  #userRepository;

  constructor({ passwordHasher, profileRepository, userRepository }) {
    this.#paswordHasher = passwordHasher;
    this.#profileRepository = profileRepository;
    this.#userRepository = userRepository;
  }

  async signup(input) {
    const [byUserEmail, byProfileEmail, byUsername] = await Promise.all([
      this.#userRepository.findByEmail(input.email),
      this.#profileRepository.findByEmail(input.email),
      this.#profileRepository.findByUsername(input.username),
    ]);

    if (byUserEmail || byProfileEmail) {
      throw new EmailAlreadyTakenError();
    }

    if (byUsername) {
      throw new UsernameAlreadyTakenError();
    }

    const hashedPassword = await this.#paswordHasher.hashPassword(
      input.password,
    );

    const user = await this.#userRepository.createWithProfile({
      ...input,
      password: hashedPassword,
    });

    return new User(user);
  }
}
