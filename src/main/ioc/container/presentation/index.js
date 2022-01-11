import { registerControllers } from './controllers';
import { registerMiddlewares } from './middlewares';
import { registerValidators } from './validators';

export const registerPresentationLayer = (container) => {
  registerMiddlewares(container);
  registerValidators(container);
  registerControllers(container);
};
