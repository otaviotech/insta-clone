import { jest } from '@jest/globals';
import { createPrismaMock } from '../../../../../../../test/mocks/prisma';
import { PrismaIsFollowingRepository } from './isFollowing';

describe('PrismaIsFollowingRepository', () => {
  const makeSut = () => {
    const prismaMock = createPrismaMock();
    const sut = new PrismaIsFollowingRepository({ prisma: prismaMock });

    const validInput = {
      followedId: 1,
      followerId: 2,
    };

    return {
      sut,
      prismaMock,
      validInput,
    };
  };

  it('should call Prisma with the correct payload', async () => {
    const { sut, prismaMock, validInput } = makeSut();

    jest.spyOn(prismaMock.follow, 'count').mockResolvedValueOnce(0);

    const result = await sut.isFollowing(validInput);

    expect(result).toBe(false);
    expect(prismaMock.follow.count).toHaveBeenCalledWith({
      where: {
        followerId: validInput.followerId,
        followedId: validInput.followedId,
      },
    });
  });

  it('should return true if is already following', async () => {
    const { sut, prismaMock, validInput } = makeSut();

    jest.spyOn(prismaMock.follow, 'count').mockResolvedValueOnce(1);

    const result = await sut.isFollowing(validInput);

    expect(result).toBe(true);
  });
});
