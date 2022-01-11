import { jest } from '@jest/globals';
import { RedisIOBlacklistAuthTokenRepository } from './blacklistAuthToken';

describe('RedisIOBlacklistAuthTokenRepository', () => {
  const makeSut = () => {
    const redisStub = {
      del: jest.fn(),
    };

    const sut = new RedisIOBlacklistAuthTokenRepository({
      redis: redisStub,
    });

    return {
      sut,
      redisStub,
    };
  };

  it('should expire the right key', async () => {
    const { sut, redisStub } = makeSut();

    redisStub.del.mockImplementationOnce((a, cb) => cb('OK'));

    await sut.blacklistAuthToken('<token>');

    expect(redisStub.del).toHaveBeenCalledWith(
      'authToken:<token>',
      expect.any(Function),
    );
  });
});
