import R from 'ramda';
import { InputValidationError } from '../../errors';
import { SignInInputValidator } from './signinInputValidator';

describe('SignInRequestValidator', () => {
  const makeSut = () => {
    const sut = new SignInInputValidator();

    const validInput = {
      identifier: 'johndoe@email.com',
      password: 'abc123',
    };

    return {
      sut,
      validInput,
    };
  };

  describe('Should validate all fields', () => {
    const requiredFields = ['identifier', 'password'];

    it.each(requiredFields)(
      'should invalidate if no %s is provided',
      async (requiredField) => {
        const { sut, validInput } = makeSut();

        const input = R.omit([requiredField], validInput);

        const result = await sut.validate(input);

        expect(result.isValid).toBe(false);
        expect(result.errors).toEqual([
          new InputValidationError(`Field ${requiredField} is required`),
        ]);
      },
    );
  });
});
