export class SignOutUseCase {
  #authService;

  constructor({ authService }) {
    this.#authService = authService;
  }

  async signOut(token) {
    await this.#authService.blacklistAuthToken(token);
  }
}
