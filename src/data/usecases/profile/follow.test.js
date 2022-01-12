import { jest } from '@jest/globals';
import { ResourceNotFoundError, ForbiddenError } from '../../../domain/errors';
import { FollowUseCase } from './follow';

describe('FollowUseCase', () => {
  const makeSut = () => {
    const profileRepositoryStub = {
      findManyProfilesByIds: jest.fn(),
      isFollowing: jest.fn(),
      addFollower: jest.fn(),
    };

    const sut = new FollowUseCase({
      profileRepository: profileRepositoryStub,
    });

    const validInput = {
      profileId: 1,
      followerProfileId: 2,
    };

    return {
      sut,
      profileRepositoryStub,
      validInput,
    };
  };

  it('should throw a ResourceNotFoundError if any of the profiles are not found', async () => {
    const { sut, profileRepositoryStub, validInput } = makeSut();

    profileRepositoryStub.findManyProfilesByIds.mockResolvedValueOnce([]);

    const promise = sut.follow(validInput);

    expect(promise).rejects.toThrow(new ResourceNotFoundError());
    expect(profileRepositoryStub.findManyProfilesByIds).toHaveBeenCalledWith([
      validInput.profileId,
      validInput.followerProfileId,
    ]);
  });

  it("should throw a ForbiddenError if it's already following", (done) => {
    const { sut, profileRepositoryStub, validInput } = makeSut();

    profileRepositoryStub.findManyProfilesByIds.mockResolvedValueOnce([
      { id: validInput.profileId },
      { id: validInput.followerProfileId },
    ]);

    profileRepositoryStub.isFollowing.mockResolvedValueOnce(true);

    sut
      .follow(validInput)
      .then(() => done.fail())
      .catch((error) => {
        expect(error).toEqual(new ForbiddenError());
        expect(
          profileRepositoryStub.findManyProfilesByIds,
        ).toHaveBeenCalledWith([
          validInput.profileId,
          validInput.followerProfileId,
        ]);
        expect(
          profileRepositoryStub.isFollowing({
            followedId: validInput.profileId,
            follwerId: validInput.followerProfileId,
          }),
        );

        done();
      });
  });

  it('should add the follower to the profile', async () => {
    const { sut, profileRepositoryStub, validInput } = makeSut();
    profileRepositoryStub.findManyProfilesByIds.mockResolvedValueOnce([
      { id: validInput.profileId },
      { id: validInput.followerProfileId },
    ]);

    profileRepositoryStub.isFollowing.mockResolvedValueOnce(false);
    profileRepositoryStub.addFollower.mockResolvedValueOnce({
      status: 'CONFIRMED',
    });

    const result = await sut.follow(validInput);

    expect(profileRepositoryStub.addFollower).toHaveBeenCalledWith({
      followedId: validInput.profileId,
      followerId: validInput.followerProfileId,
    });

    expect(result).toEqual({ status: 'CONFIRMED' });
  });
});
