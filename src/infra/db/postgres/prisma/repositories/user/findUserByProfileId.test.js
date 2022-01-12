import { jest } from '@jest/globals';
import { createPrismaMock } from '../../../../../../../test/mocks/prisma';
import { PrismaFindUserByProfileIdRepository } from './findUserByProfileId';

describe('PrismaFindUserByProfileIdRepository', () => {
  const makeSut = () => {
    const prismaMock = createPrismaMock();
    const sut = new PrismaFindUserByProfileIdRepository({ prisma: prismaMock });
    const validInput = 1;

    return {
      sut,
      prismaMock,
      validInput,
    };
  };

  it('should call Prisma with the correct payload', async () => {
    const { sut, prismaMock, validInput } = makeSut();

    jest
      .spyOn(prismaMock.profile, 'findFirst')
      .mockResolvedValueOnce({ user: { id: 1 } });

    const result = await sut.findByProfileId(validInput);

    expect(prismaMock.profile.findFirst).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { user: true },
    });

    expect(result?.id).toBe(1);
  });

  it('should return undefined profile is not found', async () => {
    const { sut, prismaMock, validInput } = makeSut();

    jest.spyOn(prismaMock.profile, 'findFirst').mockResolvedValueOnce(null);

    const result = await sut.findByProfileId(validInput);

    expect(result).toBeUndefined();
  });
});
