export * from './findProfileByEmail';
export * from './findProfileByUsername';

export class PrismaProfileRepository {
  #findProfileByEmailRepository;

  #findProfileByUsernameRepository;

  constructor({
    findProfileByEmailRepository,
    findProfileByUsernameRepository,
  }) {
    this.#findProfileByEmailRepository = findProfileByEmailRepository;
    this.#findProfileByUsernameRepository = findProfileByUsernameRepository;
  }

  async findByEmail(email) {
    return this.#findProfileByEmailRepository.findByEmail(email);
  }

  async findByUsername(username) {
    return this.#findProfileByUsernameRepository.findByUsername(username);
  }
}
