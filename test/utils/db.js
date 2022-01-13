import { prismaClient } from '../../src/infra/db/postgres/prisma';
import { redis } from '../../src/infra/db/redis/ioredis';

export const resetDatabase = async () => {
  await prismaClient.follow.deleteMany();
  await prismaClient.profile.deleteMany();
  await prismaClient.user.deleteMany();
};

export const disconnectDatabase = async () => {
  await prismaClient.$disconnect();
  await redis.disconnect();
};
