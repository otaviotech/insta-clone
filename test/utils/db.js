import { prismaClient } from '../../src/infra/db/postgres/prisma';
import { redis } from '../../src/infra/db/redis/ioredis';
import { AppEnv } from '../../src/main/env';

export const resetDatabase = async () => {
  const tablenames =
    await prismaClient.$queryRaw`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

  // eslint-disable-next-line no-restricted-syntax
  for (const { tablename } of tablenames) {
    if (tablename !== '_prisma_migrations') {
      const schema = AppEnv.DATABASE_URL.match('schema=(.*)')[1];

      try {
        // eslint-disable-next-line no-await-in-loop
        await prismaClient.$executeRawUnsafe(
          `TRUNCATE TABLE "${schema}"."${tablename}" CASCADE;`,
        );
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log({ error });
      }
    }
  }
};

export const disconnectDatabase = async () => {
  await prismaClient.$disconnect();
  await redis.disconnect();
};
