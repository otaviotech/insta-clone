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
          const isJwtError = [
            jsonwebtoken.JsonWebTokenError.name,
            jsonwebtoken.NotBeforeError.name,
            jsonwebtoken.TokenExpiredError.name,
          ].includes(err.name);

          if (!isJwtError) {
            throw err;
          }

          return resolve({
            isValid: false,
          });
        }

        return resolve({
          isValid: true,
          data: jwtPayload,
        });
      });
    });
  }
}
