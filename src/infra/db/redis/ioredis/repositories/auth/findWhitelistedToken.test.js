import { jest } from '@jest/globals';
import { RedisIOFindWhitelistedTokenRepository } from './findWhitelistedToken';

describe('RedisIOFindWhitlistedTokenRepository', () => {
  const makeSut = () => {
    const redisStub = {
      get: jest.fn(),
    };

    const sut = new RedisIOFindWhitelistedTokenRepository({
      redis: redisStub,
    });

    return {
      sut,
      redisStub,
    };
  };

  it('should return the token itself it is whitelisted', async () => {
    const { sut, redisStub } = makeSut();

    redisStub.get.mockImplementationOnce((key, cb) => {
      cb(null, 'valid');
    });

    const result = await sut.findWhitelistedToken('<token>');

    expect(result).toEqual('<token>');
  });

  it('should return undefined it is NOT whitelisted', async () => {
    const { sut, redisStub } = makeSut();

    redisStub.get.mockImplementationOnce((key, cb) => {
      cb(null, undefined);
    });

    const result = await sut.findWhitelistedToken('<token>');

    expect(result).toBeUndefined();
  });
});
