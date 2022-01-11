import { InvalidCredentialsError } from '../../domain/errors';

export class AuthMiddleware {
  #authService;

  constructor({ authService }) {
    this.#authService = authService;
  }

  async handle(req) {
    const { authorization } = req.headers;

    const token = authorization.replace?.(/^Bearer /, '').trim();

    try {
      const user = await this.#authService.authenticateUserByToken(token);

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
