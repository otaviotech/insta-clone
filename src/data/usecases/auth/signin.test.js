import { jest } from '@jest/globals';
import { InvalidCredentialsError } from '../../../domain/errors';
import { SignInUseCase } from './signin';

describe('SignInUseCase', () => {
  const makeSut = () => {
    const profileRepositoryStub = {
      findByEmail: jest.fn(() => ({ id: 1 })),
      findByUsername: jest.fn(() => ({ id: 1 })),
    };
    const userRepositoryStub = { findByProfileId: jest.fn(() => ({ id: 1 })) };
    const authServiceStub = {
      generateAuthToken: jest.fn(() => 'A.JWT.TOKEN'),
      comparePasswords: jest.fn(() => true),
      whitelistAuthToken: jest.fn(() => Promise.resolve()),
    };

    const sut = new SignInUseCase({
      profileRepository: profileRepositoryStub,
      userRepository: userRepositoryStub,
      authService: authServiceStub,
    });

    const validInput = {
      identifier: 'johndoe@email.com',
      password: 'strongpassword',
    };

    return {
      sut,
      profileRepositoryStub,
      userRepositoryStub,
      authServiceStub,
      validInput,
    };
  };

  it("should throw an InvalidCredentialsError if can't find the profile by email or username", async () => {
    const { sut, profileRepositoryStub, validInput } = makeSut();

    jest
      .spyOn(profileRepositoryStub, 'findByEmail')
      .mockResolvedValueOnce(undefined);

    jest
      .spyOn(profileRepositoryStub, 'findByUsername')
      .mockResolvedValueOnce(undefined);

    const promise = sut.signin(validInput);

    expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  it("should throw if the passwords don't match", async () => {
    const { sut, userRepositoryStub, authServiceStub, validInput } = makeSut();

    const dbPassword = 'any password';

    jest
      .spyOn(userRepositoryStub, 'findByProfileId')
      .mockResolvedValueOnce({ id: 1, password: dbPassword });

    jest
      .spyOn(authServiceStub, 'comparePasswords')
      .mockResolvedValueOnce(false);

    sut.signin(validInput).catch((error) => {
      expect(error).toEqual(new InvalidCredentialsError());
      expect(authServiceStub.comparePasswords).toHaveBeenCalledWith(
        validInput.password,
        dbPassword,
      );
    });
  });

  it("should generate(and return) a jwt token using the user's id", async () => {
    const { sut, userRepositoryStub, authServiceStub, validInput } = makeSut();

    const user = { id: 1 };
    jest
      .spyOn(userRepositoryStub, 'findByProfileId')
      .mockResolvedValueOnce(user);

    jest.spyOn(authServiceStub, 'generateAuthToken');

    const result = await sut.signin(validInput);

    expect(authServiceStub.generateAuthToken).toHaveBeenCalledWith(user);

    expect(result).toEqual('A.JWT.TOKEN');
  });

  it('should whitelist the generated(and returned) jwt token', async () => {
    const { sut, userRepositoryStub, authServiceStub, validInput } = makeSut();

    const user = { id: 1 };
    jest
      .spyOn(userRepositoryStub, 'findByProfileId')
      .mockResolvedValueOnce(user);

    jest.spyOn(authServiceStub, 'generateAuthToken');

    const result = await sut.signin(validInput);

    expect(authServiceStub.generateAuthToken).toHaveBeenCalledWith(user);
    expect(authServiceStub.whitelistAuthToken).toHaveBeenCalledWith(
      'A.JWT.TOKEN',
    );

    expect(result).toEqual('A.JWT.TOKEN');
  });
});
