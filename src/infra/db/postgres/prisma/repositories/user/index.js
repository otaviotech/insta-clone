export * from './createUserWithProfile';
export * from './findUserByEmail';
export * from './findUserByProfileId';

export class PrismaUserRepository {
  #createUserWithProfileRepository;

  #findUserByEmailRepository;

  #findUserByProfileIdRepository;

  constructor({
    createUserWithProfileRepository,
    findUserByEmailRepository,
    findUserByProfileIdRepository,
  }) {
    this.#createUserWithProfileRepository = createUserWithProfileRepository;
    this.#findUserByEmailRepository = findUserByEmailRepository;
    this.#findUserByProfileIdRepository = findUserByProfileIdRepository;
  }

  async createWithProfile(input) {
    return this.#createUserWithProfileRepository.createWithProfile(input);
  }

  async findByEmail(email) {
    return this.#findUserByEmailRepository.findByEmail(email);
  }

  async findByProfileId(profileId) {
    return this.#findUserByProfileIdRepository.findByProfileId(profileId);
  }
}
