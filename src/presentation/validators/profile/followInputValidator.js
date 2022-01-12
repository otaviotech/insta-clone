import * as yup from 'yup';
import { InputValidationError } from '../../errors';

export class FollowInputValidator {
  async validate(input) {
    const result = {
      isValid: true,
      errors: [],
    };

    const schema = yup.object({
      profileId: yup
        .number()
        .integer('Field profileId must be an integer number')
        .required('Field profileId is required.')
        .notOneOf(
          [yup.ref('followerProfileId')],
          'Fields profileId and followerProfileId must be different.',
        ),
      followerProfileId: yup
        .number()
        .integer('Field followerProfileId must be an integer number')
        .required('Field followerProfileId is required.')
        .notOneOf(
          [yup.ref('profileId')],
          'Fields profileId and followerProfileId must be different.',
        ),
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
