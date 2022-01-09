import * as yup from 'yup';
import { InputValidationError } from '../../errors';

export class SignInInputValidator {
  async validate(input) {
    const result = {
      isValid: true,
      errors: [],
    };

    const schema = yup.object({
      identifier: yup.string().required('Field identifier is required'),
      password: yup.string().required('Field password is required'),
    });

    try {
      await schema.validate(input);
    } catch (error) {
      const parsedErrors = error.errors.map((e) => new InputValidationError(e));

      result.errors.push(...parsedErrors);
      result.isValid = false;
    }

    return result;
  }
}
