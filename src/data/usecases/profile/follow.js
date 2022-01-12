import { ForbiddenError, ResourceNotFoundError } from '../../../domain/errors';

export class FollowUseCase {
  #profileRepository;

  constructor({ profileRepository }) {
    this.#profileRepository = profileRepository;
  }

  async follow(input) {
    const profiles = await this.#profileRepository.findManyProfilesByIds([
      input.profileId,
      input.followerProfileId,
    ]);

    if (profiles.length === 0) {
      throw new ResourceNotFoundError();
    }

    const isAlreadyFollowing = await this.#profileRepository.isFollowing({
      followedId: input.profileId,
      followerId: input.followerProfileId,
    });

    if (isAlreadyFollowing) {
      throw new ForbiddenError();
    }

    const { status } = await this.#profileRepository.addFollower({
      followedId: input.profileId,
      followerId: input.followerProfileId,
    });

    return { status };
  }
}
