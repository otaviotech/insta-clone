import { jest } from '@jest/globals';
import { InvalidCredentialsError } from '../../../domain/errors';
import { AuthenticateUserByTokenUseCase } from './authenticateUserByToken';

describe('AuthenticateUserByTokenUseCase', () => {
  const makeSut = () => {
    const findUserByTokenRepositoryStub = {
      findUserByToken: jest.fn(async () => undefined),
    };

    const authTokenValidatorStub = {
      validateAuthToken: jest.fn(async () => ({
        isValid: true,
        data: { id: 1 },
      })),
    };

    const sut = new AuthenticateUserByTokenUseCase({
      findUserByTokenRepository: findUserByTokenRepositoryStub,
      authTokenValidator: authTokenValidatorStub,
    });

    return {
      sut,
      findUserByTokenRepositoryStub,
      authTokenValidatorStub,
    };
  };

  it('should return the user', async () => {
    const { sut, findUserByTokenRepositoryStub } = makeSut();

    findUserByTokenRepositoryStub.findUserByToken.mockResolvedValueOnce({
      id: 2,
    });

    const result = await sut.authenticateUserByToken('<token>');

    expect(result).toEqual({ id: 2 });
  });

  it('should throw an InvalidCredentialsError if token is not valid', () => {
    const { sut, findUserByTokenRepositoryStub, authTokenValidatorStub } =
      makeSut();

    authTokenValidatorStub.validateAuthToken.mockResolvedValueOnce({
      isValid: false,
      data: null,
    });

    const promise = sut.authenticateUserByToken('<token>');

    expect(promise).rejects.toThrow(new InvalidCredentialsError());

    expect(authTokenValidatorStub.validateAuthToken).toHaveBeenCalledWith(
      '<token>',
    );
    expect(
      findUserByTokenRepositoryStub.findUserByToken,
    ).not.toHaveBeenCalled();
  });

  it('should throw an InvalidCredentialsError if no user is found', (done) => {
    const { sut, findUserByTokenRepositoryStub, authTokenValidatorStub } =
      makeSut();

    const promise = sut.authenticateUserByToken('<token>');

    promise
      .then(() => done.fail())
      .catch(() => {
        expect(promise).rejects.toThrow(new InvalidCredentialsError());

        expect(authTokenValidatorStub.validateAuthToken).toHaveBeenCalledWith(
          '<token>',
        );

        expect(
          findUserByTokenRepositoryStub.findUserByToken,
        ).toHaveBeenCalledWith('<token>');

        done();
      });
  });
});
