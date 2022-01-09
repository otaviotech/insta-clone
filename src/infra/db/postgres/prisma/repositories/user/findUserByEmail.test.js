import { jest } from '@jest/globals';
import { createPrismaMock } from '../../../../../../../test/mocks/prisma';
import { PrismaFindUserByEmailRepository } from './findUserByEmail';

describe('PrismaFindUserByEmailRepository', () => {
  const makeSut = () => {
    const prismaMock = createPrismaMock();
    const sut = new PrismaFindUserByEmailRepository(prismaMock);
    const validInput = 'johndoe@email.com';

    return {
      sut,
      prismaMock,
      validInput,
    };
  };

  it('should call Prisma with the correct payload', async () => {
    const { sut, prismaMock, validInput } = makeSut();

    jest.spyOn(prismaMock.user, 'findFirst').mockResolvedValueOnce({ id: 1 });

    const result = await sut.findByEmail(validInput);

    expect(result?.id).toBe(1);
  });

  it('should return undefined profile is not found', async () => {
    const { sut, prismaMock, validInput } = makeSut();

    jest.spyOn(prismaMock.user, 'findFirst').mockResolvedValueOnce(null);

    const result = await sut.findByEmail(validInput);

    expect(result).toBeUndefined();
  });
});
