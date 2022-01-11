import { asClass } from 'awilix';
import {
  RedisIOBlacklistAuthTokenRepository,
  RedisIOFindWhitelistedTokenRepository,
  RedisIOWhitelistAuthTokenRepository,
} from '../../../../../infra/db/redis/ioredis/repositories';

export const registerAuthRepositories = (container) => {
  container.register({
    blacklistAuthTokenRepository: asClass(RedisIOBlacklistAuthTokenRepository),
    findWhitelistedTokenRepository: asClass(
      RedisIOFindWhitelistedTokenRepository,
    ),

    whitelistAuthTokenRepository: asClass(RedisIOWhitelistAuthTokenRepository),
  });
};
