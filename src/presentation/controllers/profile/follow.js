import { ForbiddenError, ResourceNotFoundError } from '../../../domain/errors';
import { badRequest, getStatusCodeForError } from '../../helpers/http';

export class FollowController {
  #followUseCase;

  #followInputValidator;

  constructor({ followInputValidator, followUseCase }) {
    this.#followUseCase = followUseCase;
    this.#followInputValidator = followInputValidator;
  }

  async handle(req) {
    const input = {
      profileId: req?.params?.profileId,
      followerProfileId: req?.body?.followerProfileId,
      followerUserId: req?.user?.id,
    };

    const validationResult = await this.#followInputValidator.validate(input);

    if (!validationResult.isValid) {
      return badRequest(validationResult.errors[0]);
    }

    const domainErrors = [ResourceNotFoundError, ForbiddenError].map(
      (e) => e.name,
    );

    try {
      const { status } = await this.#followUseCase.follow(input);
      return { statusCode: 200, data: { status } };
    } catch (error) {
      if (domainErrors.includes(error.name)) {
        return { statusCode: getStatusCodeForError(error), error };
      }

      throw error;
    }
  }
}
