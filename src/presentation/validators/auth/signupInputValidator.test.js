import R from 'ramda';
import { InputValidationError } from '../../errors';
import { SignUpInputValidator } from './signupInputValidator';

describe('SignUpInputValidator', () => {
  const makeSut = () => {
    const sut = new SignUpInputValidator();

    const validInput = {
      email: 'johndoe@email.com',
      username: 'jdoe',
      password: 'abc123',
    };

    return {
      sut,
      validInput,
    };
  };

  describe('Should validate all fields', () => {
    const requiredFields = ['email', 'username', 'password'];

    it.each(requiredFields)(
      'should invalidate if no %s is provided',
      async (requiredField) => {
        const { sut, validInput } = makeSut();

        const input = R.omit([requiredField], validInput);

        const result = await sut.validate(input);

        expect(result.isValid).toBe(false);
        expect(result.errors).toEqual([
          new InputValidationError(`Field ${requiredField} is required.`),
        ]);
      },
    );

    it('should invalidate an invalid email is provided', async () => {
      const { sut, validInput } = makeSut();

      const input = { ...validInput, email: 'foobar.com' };

      const result = await sut.validate(input);

      expect(result.isValid).toBe(false);
      expect(result.errors).toEqual([
        new InputValidationError('Field email must be a valid email.'),
      ]);
    });

    it('should understand a valid input', async () => {
      const { sut, validInput } = makeSut();

      const result = await sut.validate(validInput);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });
});
