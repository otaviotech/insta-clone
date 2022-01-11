export class RedisIOFindWhitelistedTokenRepository {
  #redis;

  constructor({ redis }) {
    this.#redis = redis;
  }

  async findWhitelistedToken(token) {
    return new Promise((resolve) => {
      this.#redis.get(`authToken:${token}`, (err, result) => {
        resolve(result === 'valid' ? token : undefined);
      });
    });
  }
}
