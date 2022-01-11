export * from './createUserWithProfile';
export * from './findUserByEmail';
export * from './findUserByProfileId';
export * from './findUserById';

export class PrismaUserRepository {
  #createUserWithProfileRepository;

  #findUserByEmailRepository;

  #findUserByProfileIdRepository;

  #findUserByIdRepository;

  constructor({
    createUserWithProfileRepository,
    findUserByEmailRepository,
    findUserByProfileIdRepository,
    findUserByIdRepository,
  }) {
    this.#createUserWithProfileRepository = createUserWithProfileRepository;
    this.#findUserByEmailRepository = findUserByEmailRepository;
    this.#findUserByProfileIdRepository = findUserByProfileIdRepository;
    this.#findUserByIdRepository = findUserByIdRepository;
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

  async findById(id) {
    return this.#findUserByIdRepository.findById(id);
  }
}
