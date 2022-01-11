import { jest } from '@jest/globals';
import { RedisIOWhitelistAuthTokenRepository } from './whitelistAuthToken';

describe('RedisIOWhitelistAuthTokenRepository', () => {
  const makeSut = () => {
    const redisStub = {
      set: jest.fn(),
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
    const EXP_MS = 1641934763;

    redisStub.set.mockImplementationOnce((a, b, c, d, cb) => cb('OK'));

    await sut.whitelistAuthToken('<token>', EXP_MS);

    expect(redisStub.set).toHaveBeenCalledWith(
      'authToken:<token>',
      'valid',
      'EXAT',
      EXP_MS,
      expect.any(Function),
    );
  });
});
