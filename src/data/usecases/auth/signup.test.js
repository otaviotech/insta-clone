import { jest } from '@jest/globals';
import {
  EmailAlreadyTakenError,
  UsernameAlreadyTakenError,
} from '../../../domain/errors';
import { SignUpUseCase } from './signup';

jest.useFakeTimers();

describe('SignUpUseCase', () => {
  const makeSut = () => {
    const passwordHasherStub = {
      hashPassword: jest.fn(async (password) => `hashed_${password}`),
    };

    const profileRepoStub = {
      findByEmail: jest.fn(async () => undefined),
      findByUsername: jest.fn(async () => undefined),
    };

    const userRepoStub = {
      findByEmail: jest.fn(async () => undefined),
      createWithProfile: jest.fn(async () => ({ id: 1 })),
    };

    const sut = new SignUpUseCase({
      passwordHasher: passwordHasherStub,
      profileRepository: profileRepoStub,
      userRepository: userRepoStub,
    });

    const validInput = {
      email: 'johndoe@email.com',
      username: 'jdoe',
      password: 'strongpassword!',
    };

    return {
      sut,
      passwordHasherStub,
      profileRepoStub,
      userRepoStub,
      validInput,
    };
  };

  it('should hash the password', async () => {
    const { sut, passwordHasherStub, validInput } = makeSut();

    jest.spyOn(passwordHasherStub, 'hashPassword');

    await sut.signup(validInput);

    expect(passwordHasherStub.hashPassword).toHaveBeenCalledWith(
      validInput.password,
    );
  });

  it('should throw if the password hasher throws', () => {
    const { sut, passwordHasherStub, profileRepoStub, validInput } = makeSut();

    const errorThrown = new Error('Error thrown by password hasher.');

    jest
      .spyOn(profileRepoStub, 'findByUsername')
      .mockResolvedValueOnce(undefined);

    jest
      .spyOn(passwordHasherStub, 'hashPassword')
      .mockImplementationOnce(() => {
        throw errorThrown;
      });

    const promise = sut.signup(validInput);

    expect(promise).rejects.toThrow(errorThrown);
  });

  it("should throw if there's already a user with the same email", () => {
    const { sut, userRepoStub, validInput } = makeSut();

    jest.spyOn(userRepoStub, 'findByEmail').mockResolvedValueOnce({ id: 1 });

    const promise = sut.signup(validInput);

    expect(promise).rejects.toThrow(new EmailAlreadyTakenError());
  });

  it("should throw if there's already a profile with the same email", () => {
    const { sut, profileRepoStub, validInput } = makeSut();

    jest.spyOn(profileRepoStub, 'findByEmail').mockResolvedValueOnce({ id: 1 });

    const promise = sut.signup(validInput);

    expect(promise).rejects.toThrow(new EmailAlreadyTakenError());
  });

  it("should throw if there's already a profile with the same username", () => {
    const { sut, profileRepoStub, validInput } = makeSut();

    jest
      .spyOn(profileRepoStub, 'findByUsername')
      .mockResolvedValueOnce({ id: 1 });

    const promise = sut.signup(validInput);

    expect(promise).rejects.toThrow(new UsernameAlreadyTakenError());
  });

  it('should create a user with a profile attached', async () => {
    const { sut, userRepoStub, validInput } = makeSut();

    jest.spyOn(userRepoStub, 'createWithProfile');

    const user = await sut.signup(validInput);

    expect(userRepoStub.createWithProfile).toHaveBeenCalledWith({
      ...validInput,
      password: `hashed_${validInput.password}`,
    });

    expect(user).toBeDefined();
    expect(user.id).toBe(1);
    expect(user.password).toBeUndefined();
  });
});
