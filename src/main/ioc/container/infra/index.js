import { registerAuth } from './auth';
import { registerPrisma } from './prisma';
import { registerRedis } from './redis';
import { registerRepositories } from './repositories';
import { registerServices } from './services';

export const registerInfraLayer = (container) => {
  registerPrisma(container);
  registerRedis(container);
  registerRepositories(container);
  registerAuth(container);
  registerServices(container);
};
