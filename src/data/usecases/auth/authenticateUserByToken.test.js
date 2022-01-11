import { jest } from '@jest/globals';
import { InvalidCredentialsError } from '../../../domain/errors';
import { AuthenticateUserByTokenUseCase } from './authenticateUserByToken';

describe('AuthenticateUserByTokenUseCase', () => {
  const makeSut = () => {
    const userRepositoryStub = {
      findById: jest.fn(async () => undefined),
    };

    const authServiceStub = {
      validateAuthToken: jest.fn(async () => ({
        isValid: true,
        data: { user: { id: 1 } },
      })),
    };

    const sut = new AuthenticateUserByTokenUseCase({
      authService: authServiceStub,
      userRepository: userRepositoryStub,
    });

    return {
      sut,
      authServiceStub,
      userRepositoryStub,
    };
  };

  it('should return the user', async () => {
    const { sut, userRepositoryStub } = makeSut();

    userRepositoryStub.findById.mockResolvedValueOnce({
      id: 2,
    });

    const result = await sut.authenticateUserByToken('<token>');

    expect(result).toEqual({ id: 2 });
  });

  it('should throw an InvalidCredentialsError if token is not valid', () => {
    const { sut, authServiceStub, userRepositoryStub } = makeSut();

    authServiceStub.validateAuthToken.mockResolvedValueOnce({
      isValid: false,
      data: null,
    });

    const promise = sut.authenticateUserByToken('<token>');

    expect(promise).rejects.toThrow(new InvalidCredentialsError());

    expect(authServiceStub.validateAuthToken).toHaveBeenCalledWith('<token>');
    expect(userRepositoryStub.findById).not.toHaveBeenCalled();
  });

  it('should throw an InvalidCredentialsError if no user is found', (done) => {
    const { sut, authServiceStub, userRepositoryStub } = makeSut();

    const promise = sut.authenticateUserByToken('<token>');

    promise
      .then(() => done.fail())
      .catch(() => {
        expect(promise).rejects.toThrow(new InvalidCredentialsError());

        expect(authServiceStub.validateAuthToken).toHaveBeenCalledWith(
          '<token>',
        );

        expect(userRepositoryStub.findById).toHaveBeenCalledWith(1);

        done();
      });
  });
});
