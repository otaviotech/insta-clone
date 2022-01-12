import R from 'ramda';
import { InputValidationError } from '../../errors';
import { FollowInputValidator } from './followInputValidator';

describe('FollowInputValidator', () => {
  const makeSut = () => {
    const sut = new FollowInputValidator();

    const validInput = {
      profileId: 1,
      followerProfileId: 2,
    };

    return {
      sut,
      validInput,
    };
  };

  describe('Should validate all fields', () => {
    const requiredFields = ['profileId', 'followerProfileId'];

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

    it('should ensure that profileId and followerProfileId are different', async () => {
      const { sut } = makeSut();
      const result = await sut.validate({ profileId: 1, followerProfileId: 1 });
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0]).toEqual(
        new InputValidationError(
          'Fields profileId and followerProfileId must be different.',
        ),
      );
    });

    it('shoud accept a valid input', async () => {
      const { sut, validInput } = makeSut();
      const result = await sut.validate(validInput);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });
});
