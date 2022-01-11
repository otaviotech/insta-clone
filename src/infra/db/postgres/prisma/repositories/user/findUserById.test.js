import { jest } from '@jest/globals';
import { createPrismaMock } from '../../../../../../../test/mocks/prisma';
import { PrismaFindUserByIdRepository } from './findUserById';

describe('PrismaFindUserByIdRepository', () => {
  const makeSut = () => {
    const prismaMock = createPrismaMock();
    const sut = new PrismaFindUserByIdRepository({ prisma: prismaMock });
    const validInput = 1;

    return {
      sut,
      prismaMock,
      validInput,
    };
  };

  it('should call Prisma with the correct payload', async () => {
    const { sut, prismaMock, validInput } = makeSut();

    jest.spyOn(prismaMock.user, 'findFirst').mockResolvedValueOnce({ id: 1 });

    const result = await sut.findById(validInput);

    expect(result?.id).toBe(1);
  });

  it('should return undefined if user is not found', async () => {
    const { sut, prismaMock, validInput } = makeSut();

    jest.spyOn(prismaMock.user, 'findFirst').mockResolvedValueOnce(null);

    const result = await sut.findById(validInput);

    expect(result).toBeUndefined();
  });
});
