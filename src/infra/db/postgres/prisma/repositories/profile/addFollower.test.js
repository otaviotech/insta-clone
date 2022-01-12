import { jest } from '@jest/globals';
import { createPrismaMock } from '../../../../../../../test/mocks/prisma';
import { PrismaAddFollowerRepository } from './addFollower';

describe('PrismaAddFollowerRepository', () => {
  const makeSut = () => {
    const prismaMock = createPrismaMock();
    const sut = new PrismaAddFollowerRepository({ prisma: prismaMock });

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

    jest
      .spyOn(prismaMock.follow, 'create')
      .mockResolvedValueOnce({ status: 'CONFIRMED' });

    const result = await sut.addFollower(validInput);

    expect(result).toEqual({ status: 'CONFIRMED' });
    expect(prismaMock.follow.create).toHaveBeenCalledWith({
      data: {
        followerId: validInput.followedId,
        followedId: validInput.followedId,
      },
    });
  });
});
