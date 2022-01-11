import { asClass } from 'awilix';
import { AuthService } from '../../../../data/services/auth';

export const registerServices = (container) => {
  container.register({
    authService: asClass(AuthService),
  });
};
