import { jest } from '@jest/globals';
import bcrypt from 'bcrypt';
import { BcryptPasswordHashComparer } from './bcryptPasswordHashComparer';

describe('BcryptPasswordHashComparer', () => {
  const makeSut = () => {
    const sut = new BcryptPasswordHashComparer();

    return { sut };
  };

  it('should return what bcrypt says', async () => {
    const { sut } = makeSut();

    jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);

    const result = await sut.comparePasswords('abc', 'hashed_abc');

    expect(bcrypt.compare).toHaveBeenCalledWith('abc', 'hashed_abc');

    expect(result).toBe(true);
  });

  it('should throw if bcrypt throws', async () => {
    const { sut } = makeSut();

    const errorThrown = new Error('Error thrown by bcrypt.compare()');

    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
      throw errorThrown;
    });

    const promise = sut.comparePasswords('abc', 'hashed_abc');

    expect(promise).rejects.toThrow(errorThrown);
  });
});
