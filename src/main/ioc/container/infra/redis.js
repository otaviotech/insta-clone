import { asValue } from 'awilix';
import { redis } from '../../../../infra/db/redis/ioredis';

export const registerRedis = (container) => {
  container.register({ redis: asValue(redis) });
};
