import { jest } from '@jest/globals';
import R from 'ramda';
import { InputValidationError } from '../../errors/inputValidation';
import { SignUpController } from './signup';

describe('SignUpController', () => {
  const makeSut = () => {
    const signUpUseCaseStub = {
      signup: jest.fn(async () => ({ id: 1 })),
    };

    const signUpRequestInputValidatorStub = {
      validate: jest.fn(async () => ({ isValid: true, errors: [] })),
    };

    const sut = new SignUpController(
      signUpUseCaseStub,
      signUpRequestInputValidatorStub,
    );

    const validRequest = {
      body: {
        username: 'jdoe',
        email: 'johndoe@email.com',
        password: 'strongpassword',
      },
    };

    return {
      sut,
      signUpUseCaseStub,
      signUpRequestInputValidatorStub,
      validRequest,
    };
  };

  const requiredFields = ['email', 'username', 'password'];

  it.each(requiredFields)(
    'should return if parameter %s is missing',
    async (requiredField) => {
      const { sut, signUpRequestInputValidatorStub, validRequest } = makeSut();

      const validationError = new InputValidationError(
        `Field ${requiredField} is required`,
      );

      jest
        .spyOn(signUpRequestInputValidatorStub, 'validate')
        .mockResolvedValueOnce({
          isValid: false,
          errors: [validationError],
        });

      const req = {
        body: {
          ...R.omit([requiredField], validRequest.body),
        },
      };

      const result = await sut.handle(req);

      expect(result.statusCode).toBe(400);
      expect(result.error).toEqual(validationError);
    },
  );

  it('should call SignUpUseCase', async () => {
    const { sut, signUpUseCaseStub, validRequest } = makeSut();

    jest.spyOn(signUpUseCaseStub, 'signup');

    const result = await sut.handle(validRequest);

    expect(result.statusCode).toBe(201);
    expect(signUpUseCaseStub.signup).toHaveBeenCalledWith(validRequest.body);
    expect(result.data).toEqual({ id: 1 });
  });
});
