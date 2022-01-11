import { jest } from '@jest/globals';
import jsonwebtoken from 'jsonwebtoken';
import { JwtAuthTokenValidator } from './JwtAuthTokenValidator';

describe('Name of the group', () => {
  const makeSut = () => {
    const sut = new JwtAuthTokenValidator();

    return {
      sut,
    };
  };

  it('should throw if jsonwebtoken throws', () => {
    const { sut } = makeSut();

    const errorThrown = new Error('Error thrown by jsonwebtoken');

    jest
      .spyOn(jsonwebtoken, 'verify')
      .mockImplementationOnce((a, b, cb) => cb(errorThrown));

    const promise = sut.validateAuthToken('<token>');

    expect(promise).rejects.toThrow(errorThrown);
  });

  it('should return the data inside the token', async () => {
    const { sut } = makeSut();

    jest
      .spyOn(jsonwebtoken, 'verify')
      .mockImplementationOnce((a, b, cb) => cb(null, { id: 1 }));

    const result = await sut.validateAuthToken('<token>');

    expect(result.isValid).toBe(true);
    expect(result.data).toEqual({ id: 1 });
  });
});
