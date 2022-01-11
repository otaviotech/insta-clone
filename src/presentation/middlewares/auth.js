import { InvalidCredentialsError } from '../../domain/errors';

export class AuthMiddleware {
  #authenticateUserByTokenUseCase;

  constructor({ authenticateUserByTokenUseCase }) {
    this.#authenticateUserByTokenUseCase = authenticateUserByTokenUseCase;
  }

  async handle(req) {
    const { authorization } = req.headers;

    const token = authorization.replace?.(/^Bearer /, '').trim();

    try {
      const user =
        await this.#authenticateUserByTokenUseCase.authenticateUserByToken(
          token,
        );

      return {
        injectReq: {
          user: { id: user.id },
        },
      };
    } catch (error) {
      if (error.name === InvalidCredentialsError.name) {
        return {
          statusCode: 401,
          error: new InvalidCredentialsError(),
        };
      }

      throw error;
    }
  }
}
