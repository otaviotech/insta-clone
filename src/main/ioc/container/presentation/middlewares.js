import { asClass } from 'awilix';
import { AuthMiddleware } from '../../../../presentation/middlewares';

export const registerMiddlewares = (container) => {
  container.register({
    authMiddleware: asClass(AuthMiddleware),
  });
};
