import { jest } from '@jest/globals';
import { AuthMiddleware } from './auth';
import { InvalidCredentialsError } from '../../domain/errors';

describe('AuthMiddleware', () => {
  const makeSut = () => {
    const authServiceStub = {
      authenticateUserByToken: jest.fn(() => ({ id: 1 })),
    };

    const sut = new AuthMiddleware({
      authService: authServiceStub,
    });

    const validInput = {
      headers: {
        authorization: 'Bearer <token>',
      },
    };

    return {
      sut,
      authServiceStub,
      validInput,
    };
  };

  it('should injectReq the user into the request', async () => {
    const { sut, authServiceStub, validInput } = makeSut();

    const result = await sut.handle(validInput);

    expect(authServiceStub.authenticateUserByToken).toHaveBeenCalledWith(
      '<token>',
    );
    expect(result.injectReq).toEqual({ user: { id: 1 } });
    expect(result.statusCode).toBeUndefined();
    expect(result.error).toBeUndefined();
  });

  it('should return the error if user is not found', async () => {
    const { sut, authServiceStub, validInput } = makeSut();

    authServiceStub.authenticateUserByToken.mockImplementationOnce(() => {
      throw new InvalidCredentialsError();
    });

    const result = await sut.handle(validInput);

    expect(authServiceStub.authenticateUserByToken).toHaveBeenCalledWith(
      '<token>',
    );
    expect(result.injectReq).toBeUndefined();
    expect(result.statusCode).toBe(401);
    expect(result.error).toEqual(new InvalidCredentialsError());
  });

  it('should not handle if it is NOT a domain error', async () => {
    const { sut, authServiceStub, validInput } = makeSut();

    const errorThrown = new Error(
      'Error thrown by AuthService.authenticateUserByToken',
    );

    authServiceStub.authenticateUserByToken.mockImplementationOnce(() => {
      throw errorThrown;
    });

    const promise = sut.handle(validInput);

    expect(promise).rejects.toThrow(errorThrown);
  });
});
