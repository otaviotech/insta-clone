import { prismaClient } from '../../src/infra/db/postgres/prisma';

export const resetDatabase = async () => {
  const tableNames =
    await prismaClient.$queryRaw`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

  // eslint-disable-next-line no-restricted-syntax
  for (const { tablename } of tableNames) {
    if (tablename !== '_prisma_migrations') {
      try {
        // eslint-disable-next-line no-await-in-loop
        await prismaClient.$executeRawUnsafe(
          `TRUNCATE TABLE "public"."${tablename}" CASCADE;`,
        );
      } catch (error) {
        console.log({ error });
      }
    }
  }
};
