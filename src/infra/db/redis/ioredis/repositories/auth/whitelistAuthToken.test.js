import { jest } from '@jest/globals';
import { RedisIOWhitelistAuthTokenRepository } from './whitelistAuthToken';

describe('RedisIOWhitelistAuthTokenRepository', () => {
  const makeSut = () => {
    const redisStub = {
      setex: jest.fn(),
    };
    const sut = new RedisIOWhitelistAuthTokenRepository({
      redis: redisStub,
    });

    return {
      sut,
      redisStub,
    };
  };

  it('should store the user token at the right key', async () => {
    const { sut, redisStub } = makeSut();

    redisStub.setex.mockImplementationOnce((a, b, c, cb) => cb('OK'));

    await sut.whitelistAuthToken('<token>');

    expect(redisStub.setex).toHaveBeenCalledWith(
      'authToken:<token>',
      expect.any(Number),
      'valid',
      expect.anything(),
    );
  });
});
