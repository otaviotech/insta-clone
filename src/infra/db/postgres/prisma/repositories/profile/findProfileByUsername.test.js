import { jest } from '@jest/globals';
import { createPrismaMock } from '../../../../../../../test/mocks/prisma';
import { PrismaFindProfileByUsername } from './findProfileByUsername';

describe('PrismaProfileByUsernameRepository', () => {
  const makeSut = () => {
    const prismaMock = createPrismaMock();
    const sut = new PrismaFindProfileByUsername({ prisma: prismaMock });
    const validInput = 'johndoe@email.com';

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
      .mockResolvedValueOnce({ id: 1 });

    const result = await sut.findByUsername(validInput);

    expect(result?.id).toBe(1);
  });

  it('should return undefined profile is not found', async () => {
    const { sut, prismaMock, validInput } = makeSut();

    jest.spyOn(prismaMock.profile, 'findFirst').mockResolvedValueOnce(null);

    const result = await sut.findByUsername(validInput);

    expect(result).toBeUndefined();
  });
});
