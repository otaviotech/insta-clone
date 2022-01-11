import { asClass } from 'awilix';
import { AuthService } from '../../../../infra/services';

export const registerServices = (container) => {
  container.register({
    authService: asClass(AuthService),
  });
};
