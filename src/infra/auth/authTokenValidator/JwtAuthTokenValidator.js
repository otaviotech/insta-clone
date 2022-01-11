import jsonwebtoken from 'jsonwebtoken';

export class JwtAuthTokenValidator {
  #secret;

  constructor(secret) {
    this.#secret = secret;
  }

  async validateAuthToken(token) {
    return new Promise((resolve) => {
      jsonwebtoken.verify(token, this.#secret, (err, jwtPayload) => {
        if (err) {
          throw err;
        }

        resolve({
          isValid: true,
          data: jwtPayload,
        });
      });
    });
  }
}
