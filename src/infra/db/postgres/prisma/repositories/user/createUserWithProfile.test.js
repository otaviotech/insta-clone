import { jest } from '@jest/globals';
import { createPrismaMock } from '../../../../../../../test/mocks/prisma';
import { PrismaCreateUserWithProfileRepository } from './createUserWithProfile';

describe('PrismaCreateUserWithProfile', () => {
  const makeSut = () => {
    const prismaMock = createPrismaMock();
    const sut = new PrismaCreateUserWithProfileRepository({
      prisma: prismaMock,
    });
    const validInput = {
      email: 'johndoe@email.com',
      password: 'abc123',
      username: 'jdoe',
    };

    return {
      sut,
      prismaMock,
      validInput,
    };
  };

  it('should call Prisma with the correct payload', async () => {
    const { sut, prismaMock, validInput } = makeSut();

    jest.spyOn(prismaMock.user, 'create').mockResolvedValueOnce({ id: 1 });

    const result = await sut.createWithProfile(validInput);

    expect(result.id).toBe(1);
  });
});
