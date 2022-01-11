import { jest } from '@jest/globals';
import { InvalidCredentialsError } from '../../../domain/errors';
import { AuthenticateUserByTokenUseCase } from './authenticateUserByToken';

describe('AuthenticateUserByTokenUseCase', () => {
  const makeSut = () => {
    const authServiceStub = {
      findUserByToken: jest.fn(async () => undefined),
      validateAuthToken: jest.fn(async () => ({
        isValid: true,
        data: { id: 1 },
      })),
    };

    const sut = new AuthenticateUserByTokenUseCase({
      authService: authServiceStub,
    });

    return {
      sut,
      authServiceStub,
    };
  };

  it('should return the user', async () => {
    const { sut, authServiceStub } = makeSut();

    authServiceStub.findUserByToken.mockResolvedValueOnce({
      id: 2,
    });

    const result = await sut.authenticateUserByToken('<token>');

    expect(result).toEqual({ id: 2 });
  });

  it('should throw an InvalidCredentialsError if token is not valid', () => {
    const { sut, authServiceStub } = makeSut();

    authServiceStub.validateAuthToken.mockResolvedValueOnce({
      isValid: false,
      data: null,
    });

    const promise = sut.authenticateUserByToken('<token>');

    expect(promise).rejects.toThrow(new InvalidCredentialsError());

    expect(authServiceStub.validateAuthToken).toHaveBeenCalledWith('<token>');
    expect(authServiceStub.findUserByToken).not.toHaveBeenCalled();
  });

  it('should throw an InvalidCredentialsError if no user is found', (done) => {
    const { sut, authServiceStub } = makeSut();

    const promise = sut.authenticateUserByToken('<token>');

    promise
      .then(() => done.fail())
      .catch(() => {
        expect(promise).rejects.toThrow(new InvalidCredentialsError());

        expect(authServiceStub.validateAuthToken).toHaveBeenCalledWith(
          '<token>',
        );

        expect(authServiceStub.findUserByToken).toHaveBeenCalledWith('<token>');

        done();
      });
  });
});
