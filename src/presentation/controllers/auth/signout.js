export class SignOutController {
  #signOutUseCase;

  constructor({ signOutUseCase }) {
    this.#signOutUseCase = signOutUseCase;
  }

  async handle(req) {
    const { authorization } = req.headers;

    const token = authorization?.replace?.(/^Bearer /, '').trim();

    await this.#signOutUseCase.signOut(token);

    return {
      statusCode: 200,
    };
  }
}
