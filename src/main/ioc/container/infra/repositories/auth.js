import { asClass } from 'awilix';
import {
  RedisIOFindWhitelistedTokenRepository,
  RedisIOWhitelistAuthTokenRepository,
} from '../../../../../infra/db/redis/ioredis/repositories';

export const registerAuthRepositories = (container) => {
  container.register({
    findWhitelistedTokenRepository: asClass(
      RedisIOFindWhitelistedTokenRepository,
    ),

    whitelistAuthTokenRepository: asClass(RedisIOWhitelistAuthTokenRepository),
  });
};
