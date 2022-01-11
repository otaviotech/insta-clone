import awlix from 'awilix';

import {
  SignUpController,
  SignInController,
  SignOutController,
} from '../../../../presentation/controllers/auth';

export const registerControllers = (container) => {
  container.register({
    signUpController: awlix.asClass(SignUpController),
    signInController: awlix.asClass(SignInController),
    signOutController: awlix.asClass(SignOutController),
  });
};
