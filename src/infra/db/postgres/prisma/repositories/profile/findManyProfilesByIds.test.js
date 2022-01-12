import { jest } from '@jest/globals';
import { createPrismaMock } from '../../../../../../../test/mocks/prisma';
import { PrismaFindManyProfilesByIdRepository } from './findManyProfilesByIds';

describe('PrismaFindManyProfilesByIdRepository', () => {
  const makeSut = () => {
    const prismaMock = createPrismaMock();
    const sut = new PrismaFindManyProfilesByIdRepository({
      prisma: prismaMock,
    });
    const validInput = [1, 2];

    return {
      sut,
      prismaMock,
      validInput,
    };
  };

  it('should call Prisma with the correct payload', async () => {
    const { sut, prismaMock, validInput } = makeSut();

    jest
      .spyOn(prismaMock.profile, 'findMany')
      .mockResolvedValueOnce([{ id: 1 }]);

    const result = await sut.findManyProfilesByIds(validInput);

    expect(result).toHaveLength(1);
    expect(prismaMock.profile.findMany).toHaveBeenCalledWith({
      where: {
        id: {
          in: validInput,
        },
      },
    });
  });

  it('should return undefined profile is not found', async () => {
    const { sut, prismaMock, validInput } = makeSut();

    jest.spyOn(prismaMock.profile, 'findMany').mockResolvedValueOnce(null);

    const result = await sut.findManyProfilesByIds(validInput);

    expect(result).toHaveLength(0);
  });
});
