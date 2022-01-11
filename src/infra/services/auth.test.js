import { jest } from '@jest/globals';
import { AuthService } from './auth';

describe('AuthService', () => {
  const makeSut = () => {
    const authTokenValidatorStub = {
      validateAuthToken: jest.fn(async () => ({
        isValid: true,
        data: {
          user: { id: 1 },
          iat: 123456,
          exp: 654321,
        },
      })),
    };

    const whitelistAuthTokenRepositoryStub = {
      whitelistAuthToken: jest.fn(() => Promise.resolve()),
    };

    const findWhitelistedTokenRepositoryStub = {
      findWhitelistedToken: jest.fn(async (token) => token),
    };

    const sut = new AuthService({
      authTokenValidator: authTokenValidatorStub,
      whitelistAuthTokenRepository: whitelistAuthTokenRepositoryStub,
      findWhitelistedTokenRepository: findWhitelistedTokenRepositoryStub,
    });

    return {
      sut,
      authTokenValidatorStub,
      whitelistAuthTokenRepositoryStub,
      findWhitelistedTokenRepositoryStub,
    };
  };

  describe('.whitelistAuthToken()', () => {
    it('should extract the exp time of the token and send to it to be whitelisted', async () => {
      const { sut, authTokenValidatorStub, whitelistAuthTokenRepositoryStub } =
        makeSut();

      await sut.whitelistAuthToken('<token>');

      expect(authTokenValidatorStub.validateAuthToken).toHaveBeenCalledWith(
        '<token>',
      );
      expect(
        whitelistAuthTokenRepositoryStub.whitelistAuthToken,
      ).toHaveBeenCalledWith('<token>', 654321);
    });
  });

  describe('.validateAuthToken()', () => {
    it('should verify if the token is whitelisted', async () => {
      const {
        sut,
        authTokenValidatorStub,
        findWhitelistedTokenRepositoryStub,
      } = makeSut();

      const result = await sut.validateAuthToken('<token>');

      expect(authTokenValidatorStub.validateAuthToken).toHaveBeenCalledWith(
        '<token>',
      );
      expect(
        findWhitelistedTokenRepositoryStub.findWhitelistedToken,
      ).toHaveBeenCalledWith('<token>');

      expect(result.isValid).toBe(true);
    });

    it('should invalidate the token is blacklisted', async () => {
      const {
        sut,
        authTokenValidatorStub,
        findWhitelistedTokenRepositoryStub,
      } = makeSut();

      findWhitelistedTokenRepositoryStub.findWhitelistedToken.mockResolvedValueOnce(
        undefined,
      );

      const result = await sut.validateAuthToken('<token>');

      expect(authTokenValidatorStub.validateAuthToken).toHaveBeenCalledWith(
        '<token>',
      );
      expect(
        findWhitelistedTokenRepositoryStub.findWhitelistedToken,
      ).toHaveBeenCalledWith('<token>');

      expect(result.isValid).toBe(false);
    });

    it('should invalidate an invalid token', async () => {
      const {
        sut,
        authTokenValidatorStub,
        findWhitelistedTokenRepositoryStub,
      } = makeSut();

      authTokenValidatorStub.validateAuthToken.mockResolvedValueOnce({
        isValid: false,
      });

      const result = await sut.validateAuthToken('<token>');

      expect(authTokenValidatorStub.validateAuthToken).toHaveBeenCalledWith(
        '<token>',
      );
      expect(
        findWhitelistedTokenRepositoryStub.findWhitelistedToken,
      ).toHaveBeenCalledWith('<token>');

      expect(result.isValid).toBe(false);
    });
  });
});
