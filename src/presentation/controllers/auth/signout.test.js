import { jest } from '@jest/globals';
import { SignOutController } from './signout';

describe('SignOutController', () => {
  const makeSut = () => {
    const signOutUseCaseStub = {
      signOut: jest.fn(),
    };

    const sut = new SignOutController({
      signOutUseCase: signOutUseCaseStub,
    });

    const validInput = {
      headers: {
        authorization: 'Bearer <token>',
      },
    };

    return {
      sut,
      signOutUseCaseStub,
      validInput,
    };
  };

  it('should pass the token to the SignOutUseCase', async () => {
    const { sut, signOutUseCaseStub, validInput } = makeSut();

    const result = await sut.handle(validInput);

    expect(signOutUseCaseStub.signOut).toHaveBeenCalledWith('<token>');
    expect(result.statusCode).toBe(200);
    expect(result.data).toBeUndefined();
    expect(result.error).toBeUndefined();
  });

  it('should throw if SignOutUseCase throws ', () => {
    const { sut, signOutUseCaseStub, validInput } = makeSut();

    const errorThrown = new Error('Error thrown by SignOutUseCase');

    signOutUseCaseStub.signOut.mockImplementationOnce(() => {
      throw errorThrown;
    });

    const promise = sut.handle(validInput);

    expect(promise).rejects.toThrow(errorThrown);
  });
});
