export class RedisIOWhitelistAuthTokenRepository {
  #redis;

  constructor({ redis }) {
    this.#redis = redis;
  }

  async whitelistAuthToken(token, expAt) {
    return new Promise((resolve) => {
      this.#redis.set(`authToken:${token}`, 'valid', 'EXAT', expAt, () => {
        resolve();
      });
    });
  }
}
