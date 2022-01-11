import Redis from 'ioredis';
import { AppEnv } from '../../../../main/env';

export const redis = new Redis(AppEnv.REDIS_URL);
