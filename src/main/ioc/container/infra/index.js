import { registerAuth } from './auth';
import { registerPrisma } from './prisma';
import { registerRepositories } from './repositories';

export const registerInfraLayer = (container) => {
  registerPrisma(container);
  registerRepositories(container);
  registerAuth(container);
};
