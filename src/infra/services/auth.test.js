import { AuthService } from './auth';

describe.skip('AuthServicee', () => {
  const makeSut = () => {
    const sut = new AuthService({});

    return {
      sut,
    };
  };

  describe('.validateAuthToken(token)', () => {
    const { sut } = makeSut();
  });
});
