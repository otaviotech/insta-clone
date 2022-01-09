import jwt from 'jsonwebtoken';

export class JwtTokenGenerator {
  #secret;

  constructor(secret) {
    this.#secret = secret;
  }

  async generateAuthToken(payload) {
    return new Promise((resolve) => {
      jwt.sign(payload, this.secret, {}, (err, token) => {
        if (err) {
          throw err;
        }

        if (token) {
          resolve(token);
        }
      });
    });
  }
}
