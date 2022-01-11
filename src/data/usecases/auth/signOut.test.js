import { jest } from '@jest/globals';
import { SignOutUseCase } from './signOut';

describe('SignOutUseCase', () => {
  const makeSut = () => {
    const authServiceStub = {
      blacklistAuthToken: jest.fn(),
    };

    const sut = new SignOutUseCase({
      authService: authServiceStub,
    });

    return {
      sut,
      authServiceStub,
    };
  };

  it('should invalidate the token', async () => {
    const { sut, authServiceStub } = makeSut();

    await sut.signOut('<token>');

    expect(authServiceStub.blacklistAuthToken).toHaveBeenCalledWith('<token>');
  });

  it('should throw if authService.blacklistAuthToken throws', async () => {
    const { sut, authServiceStub } = makeSut();

    const errorThrown = new Error(
      'Error thrown by authService.blacklistAuthToken',
    );

    authServiceStub.blacklistAuthToken.mockImplementationOnce(() => {
      throw errorThrown;
    });

    const promise = sut.signOut('<token>');

    expect(promise).rejects.toThrow(errorThrown);
  });
});
