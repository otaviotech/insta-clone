import { badRequest } from '../../helpers/http';

export class SignUpController {
  constructor(signUpUseCase, signUpRequestInputValidator) {
    this.signUpUseCase = signUpUseCase;
    this.signUpRequestInputValidator = signUpRequestInputValidator;
  }

  async handle(req) {
    const response = {
      statusCode: 201,
      data: null,
      error: null,
    };

    const validationResult = await this.signUpRequestInputValidator.validate(
      req.body,
    );

    if (!validationResult.isValid) {
      return badRequest(validationResult.errors[0]);
    }

    const signUpResult = await this.signUpUseCase.signup(req.body);

    response.data = signUpResult;

    return response;
  }
}
