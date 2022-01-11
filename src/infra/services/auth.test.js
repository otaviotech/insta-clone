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

    const sut = new AuthService({
      authTokenValidator: authTokenValidatorStub,
      whitelistAuthTokenRepository: whitelistAuthTokenRepositoryStub,
    });

    return {
      sut,
      authTokenValidatorStub,
      whitelistAuthTokenRepositoryStub,
    };
  };

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
