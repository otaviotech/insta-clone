import { asValue } from 'awilix';
import { prismaClient } from '../../../../infra/db/postgres/prisma';

export const registerPrisma = (container) => {
  container.register({ prisma: asValue(prismaClient) });
};
