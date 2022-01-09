import { registerAuth } from './auth';
import { registerPrisma } from './prisma';
import { registerRepositories } from './repositories';
import { registerServices } from './services';

export const registerInfraLayer = (container) => {
  registerPrisma(container);
  registerRepositories(container);
  registerAuth(container);
  registerServices(container);
};
