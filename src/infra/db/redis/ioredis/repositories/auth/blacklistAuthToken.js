export class RedisIOBlacklistAuthTokenRepository {
  #redis;

  constructor({ redis }) {
    this.#redis = redis;
  }

  async blacklistAuthToken(token) {
    return new Promise((resolve) => {
      this.#redis.del(`authToken:${token}`, () => {
        resolve();
      });
    });
  }
}
