export * from './addFollower';
export * from './findManyProfilesByIds';
export * from './findProfileByEmail';
export * from './findProfileByUsername';
export * from './isFollowing';

export class PrismaProfileRepository {
  #addFollowerRepository;

  #findProfileByEmailRepository;

  #findProfileByUsernameRepository;

  #findManyProfilesByIdsRepository;

  #isFollowingRepository;

  constructor({
    addFollowerRepository,
    findManyProfilesByIdsRepository,
    findProfileByEmailRepository,
    findProfileByUsernameRepository,
    isFollowingRepository,
  }) {
    this.#addFollowerRepository = addFollowerRepository;
    this.#findManyProfilesByIdsRepository = findManyProfilesByIdsRepository;
    this.#findProfileByEmailRepository = findProfileByEmailRepository;
    this.#findProfileByUsernameRepository = findProfileByUsernameRepository;
    this.#isFollowingRepository = isFollowingRepository;
  }

  async addFollower(input) {
    return this.#addFollowerRepository.addFollower(input);
  }

  async findByEmail(email) {
    return this.#findProfileByEmailRepository.findByEmail(email);
  }

  async findByUsername(username) {
    return this.#findProfileByUsernameRepository.findByUsername(username);
  }

  async findManyProfilesByIds(ids) {
    return this.#findManyProfilesByIdsRepository.findManyProfilesByIds(ids);
  }

  async isFollowing(input) {
    return this.#isFollowingRepository.isFollowing(input);
  }
}
