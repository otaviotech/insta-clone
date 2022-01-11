import { asClass } from 'awilix';
import {
  RedisIOBlacklistAuthTokenRepository,
  RedisIOFindWhitelistedTokenRepository,
  RedisIOWhitelistAuthTokenRepository,
} from '../../../../../infra/db/redis/ioredis/repositories';

export const registerAuthRepositories = (container) => {
  container.register({
    blacklistAuthToken: asClass(RedisIOBlacklistAuthTokenRepository),
    findWhitelistedTokenRepository: asClass(
      RedisIOFindWhitelistedTokenRepository,
    ),

    whitelistAuthTokenRepository: asClass(RedisIOWhitelistAuthTokenRepository),
  });
};
