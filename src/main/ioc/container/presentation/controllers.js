import awlix from 'awilix';

import { SignUpController } from '../../../../presentation/controllers/auth/signup';

export const registerControllers = (container) => {
  container.register({
    signUpController: awlix.asClass(SignUpController),
  });
};
