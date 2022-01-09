import { badRequest } from '../../helpers/http';
import { InvalidCredentialsError } from '../../../domain/errors';

export class SignInController {
  #signInInputValidator;

  #signInUseCase;

  constructor({ signInInputValidator, signInUseCase }) {
    this.#signInInputValidator = signInInputValidator;
    this.#signInUseCase = signInUseCase;
  }

  async handle(req) {
    const validationResult = await this.#signInInputValidator.validate(
      req.body,
    );

    if (!validationResult.isValid) {
      return badRequest(validationResult.errors[0]);
    }

    const domainErrors = [InvalidCredentialsError].map((e) => e.name);

    try {
      const jwt = await this.#signInUseCase.signin(req.body);
      return { statusCode: 200, data: { jwt } };
    } catch (error) {
      if (domainErrors.includes(error.name)) {
        return badRequest(error);
      }

      throw error;
    }
  }
}
