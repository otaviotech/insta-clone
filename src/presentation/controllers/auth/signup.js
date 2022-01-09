import {
  EmailAlreadyTakenError,
  UsernameAlreadyTakenError,
} from '../../../domain/errors';
import { badRequest } from '../../helpers/http';

export class SignUpController {
  #signUpUseCase;

  #signUpInputValidator;

  constructor({ signUpUseCase, signUpInputValidator }) {
    this.#signUpUseCase = signUpUseCase;
    this.#signUpInputValidator = signUpInputValidator;
  }

  async handle(req) {
    const validationResult = await this.#signUpInputValidator.validate(
      req.body,
    );

    if (!validationResult.isValid) {
      return badRequest(validationResult.errors[0]);
    }

    const domainErrors = [
      EmailAlreadyTakenError,
      UsernameAlreadyTakenError,
    ].map((e) => e.name);

    try {
      const data = await this.#signUpUseCase.signup(req.body);
      return { statusCode: 201, data };
    } catch (error) {
      if (domainErrors.includes(error.name)) {
        return badRequest(error);
      }

      throw error;
    }
  }
}
