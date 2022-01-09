import awlix from 'awilix';

import {
  SignUpController,
  SignInController,
} from '../../../../presentation/controllers/auth';

export const registerControllers = (container) => {
  container.register({
    signUpController: awlix.asClass(SignUpController),
    signInController: awlix.asClass(SignInController),
  });
};
