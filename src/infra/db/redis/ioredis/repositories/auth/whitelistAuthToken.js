export class RedisIOWhitelistAuthTokenRepository {
  #redis;

  constructor({ redis }) {
    this.#redis = redis;
  }

  async whitelistAuthToken(token) {
    return new Promise((resolve) => {
      this.#redis.setex(`authToken:${token}`, 20, 'valid', () => {
        resolve();
      });
    });
  }
}
