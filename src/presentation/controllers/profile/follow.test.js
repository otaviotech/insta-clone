import { jest } from '@jest/globals';
import { FollowController } from './follow';
import { ForbiddenError, ResourceNotFoundError } from '../../../domain/errors';

describe('FollowController', () => {
  const makeSut = () => {
    const followUseCaseStub = {
      follow: jest.fn(() => Promise.resolve({ status: 'PENDING' })),
    };

    const followInputValidatorStub = {
      validate: jest.fn(() => Promise.resolve({ isValid: true, errors: [] })),
    };

    const sut = new FollowController({
      followInputValidator: followInputValidatorStub,
      followUseCase: followUseCaseStub,
    });

    const validInput = {
      body: {
        followerProfileId: 2,
      },
      params: {
        profileId: 1,
      },
      user: {
        id: 1,
      },
    };

    const validUseCaseInput = {
      profileId: 1,
      followerProfileId: 2,
      followerUserId: 1,
    };

    return {
      sut,
      followUseCaseStub,
      followInputValidatorStub,
      validInput,
      validUseCaseInput,
    };
  };

  it('it should call the Validator and the FollowUseCase', async () => {
    const { sut, followUseCaseStub, validInput, validUseCaseInput } = makeSut();

    const result = await sut.handle(validInput);

    expect(result.statusCode).toBe(200);
    expect(result.data).toEqual({ status: 'PENDING' });
    expect(followUseCaseStub.follow).toHaveBeenCalledWith(validUseCaseInput);

    expect(result.error).toBeUndefined();
  });

  const domainErrors = [
    {
      DomainError: ResourceNotFoundError,
      name: ResourceNotFoundError.name,
      status: 404,
    },
    {
      DomainError: ForbiddenError,
      name: ForbiddenError.name,
      status: 403,
    },
  ];

  it.each(domainErrors)(
    'should return $status if the domain error ($name) is thrown',
    async ({ DomainError, status }) => {
      const { sut, validInput, followUseCaseStub } = makeSut();

      const errorThrown = new DomainError();

      jest.spyOn(followUseCaseStub, 'follow').mockImplementationOnce(() => {
        throw errorThrown;
      });

      const httpResponse = await sut.handle(validInput);

      expect(httpResponse.statusCode).toBe(status);
      expect(httpResponse.error).toEqual(errorThrown);
      expect(httpResponse.data).toBeUndefined();
    },
  );

  it('should throw if error is not a RequestValidationError nor a DomainError', async () => {
    const { sut, validInput, followUseCaseStub } = makeSut();

    const errorThrown = new Error('Error thrown by FollowUseCase.follow');

    jest.spyOn(followUseCaseStub, 'follow').mockImplementationOnce(() => {
      throw errorThrown;
    });

    const promise = sut.handle(validInput);

    expect(promise).rejects.toThrow(errorThrown);
  });
});
