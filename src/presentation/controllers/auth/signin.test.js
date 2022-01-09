import { jest } from '@jest/globals';
import R from 'ramda';
import { InvalidCredentialsError } from '../../../domain/errors';
import { InputValidationError } from '../../errors';
import { SignInInputValidator } from '../../validators/auth/signinInputValidator';
import { SignInController } from './signin';

describe('SignInController', () => {
  const makeSut = () => {
    const signInInputValidator = new SignInInputValidator();
    const signInUseCaseStub = { signin: jest.fn() };
    const sut = new SignInController({
      signInInputValidator,
      signInUseCase: signInUseCaseStub,
    });

    const validRequest = {
      body: {
        identifier: 'jdoe',
        password: 'strongpassword!',
      },
    };

    return {
      sut,
      signInUseCaseStub,
      validRequest,
    };
  };

  const requiredFields = ['identifier', 'password'];

  it.each(requiredFields)(
    'should return 400 if no %s is provided',
    async (requiredField) => {
      const { sut, validRequest } = makeSut();

      const req = {
        body: R.omit([requiredField], validRequest.body),
      };

      const httpResponse = await sut.handle(req);

      expect(httpResponse.statusCode).toBe(400);
      expect(httpResponse.error).toEqual(
        new InputValidationError(`Field ${requiredField} is required`),
      );
      expect(httpResponse.data).toBeUndefined();
    },
  );

  const domainErrors = [
    {
      DomainError: InvalidCredentialsError,
      name: InvalidCredentialsError.name,
    },
  ];

  it.each(domainErrors)(
    'should return 400 if any domain error ($name) is thrown',
    async ({ DomainError }) => {
      const { sut, validRequest, signInUseCaseStub } = makeSut();

      const errorThrown = new DomainError();

      jest.spyOn(signInUseCaseStub, 'signin').mockImplementationOnce(() => {
        throw errorThrown;
      });

      const httpResponse = await sut.handle(validRequest);

      expect(httpResponse.statusCode).toBe(400);
      expect(httpResponse.error).toEqual(errorThrown);
      expect(httpResponse.data).toBeUndefined();
    },
  );

  it('should throw if error is not a RequestValidationError nor a DomainError', async () => {
    const { sut, validRequest, signInUseCaseStub } = makeSut();

    const errorThrown = new Error('This error should not be catch');

    jest.spyOn(signInUseCaseStub, 'signin').mockImplementationOnce(() => {
      throw errorThrown;
    });

    const promise = sut.handle(validRequest);

    expect(promise).rejects.toThrow(errorThrown);
  });

  it('should return a jwt token in the body of the response', async () => {
    const { sut, signInUseCaseStub, validRequest } = makeSut();

    const jwt = 'a.jwt.token';

    jest.spyOn(signInUseCaseStub, 'signin').mockResolvedValueOnce(jwt);

    const result = await sut.handle(validRequest);

    expect(signInUseCaseStub.signin).toHaveBeenCalledWith(validRequest.body);
    expect(result.statusCode).toBe(200);
    expect(result.data).toEqual({ jwt });
  });
});
