import { prismaClient } from '../../src/infra/db/postgres/prisma';
import { redis } from '../../src/infra/db/redis/ioredis';

export const resetDatabase = async () => {
  await prismaClient.profile.deleteMany();
  await prismaClient.user.deleteMany();
  // await prismaClient.$disconnect();
};

export const disconnectDatabase = async () => {
  await prismaClient.$disconnect();
  await redis.disconnect();
};
