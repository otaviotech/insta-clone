import { registerControllers } from './controllers';
import { registerValidators } from './validators';

export const registerPresentationLayer = (container) => {
  registerValidators(container);
  registerControllers(container);
};
