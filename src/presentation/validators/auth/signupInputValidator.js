import * as yup from 'yup';
import { InputValidationError } from '../../errors';

export class SignUpInputValidator {
  // eslint-disable-next-line class-methods-use-this
  async validate(input) {
    const result = {
      isValid: true,
      errors: [],
    };

    const schema = yup.object({
      email: yup
        .string()
        .email('Field email must be a valid email.')
        .required('Field email is required.'),
      username: yup.string().required('Field username is required.'),
      password: yup.string().required('Field password is required.'),
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
