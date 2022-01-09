import { asClass } from 'awilix';
import { AuthService } from '../../../../infra/services/auth';

export const registerServices = (container) => {
  container.register({
    authService: asClass(AuthService),
  });
};
