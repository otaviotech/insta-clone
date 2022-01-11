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

  const errors = [
    {
      Err: jsonwebtoken.TokenExpiredError,
      name: jsonwebtoken.TokenExpiredError.name,
    },

    {
      Err: jsonwebtoken.NotBeforeError,
      name: jsonwebtoken.NotBeforeError.name,
    },

    {
      Err: jsonwebtoken.JsonWebTokenError,
      name: jsonwebtoken.JsonWebTokenError.name,
    },
  ];

  it.each(errors)("should not throw if it's a $name", async (err) => {
    const { sut } = makeSut();

    const errorThrown = new err.Err('Error thrown by jsonwebtoken');

    jest
      .spyOn(jsonwebtoken, 'verify')
      .mockImplementationOnce((a, b, cb) => cb(errorThrown));

    const result = await sut.validateAuthToken('<token>');

    expect(result.isValid).toBe(false);
  });

  it('should return the data inside the token', async () => {
    const { sut } = makeSut();

    const EXP_MS = 1641934763;
    const IAT_MS = 1641931163;

    jest
      .spyOn(jsonwebtoken, 'verify')
      .mockImplementationOnce((a, b, cb) =>
        cb(null, { id: 1, iat: IAT_MS, exp: EXP_MS }),
      );

    const result = await sut.validateAuthToken('<token>');

    expect(result.isValid).toBe(true);
    expect(result.data).toEqual({ id: 1, iat: IAT_MS, exp: EXP_MS });
  });
});
