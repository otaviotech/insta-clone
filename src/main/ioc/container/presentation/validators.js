import awlix from 'awilix';

import {
  SignUpInputValidator,
  SignInInputValidator,
} from '../../../../presentation/validators/auth';

export const registerValidators = (container) => {
  container.register({
    signUpInputValidator: awlix.asClass(SignUpInputValidator),
    signInInputValidator: awlix.asClass(SignInInputValidator),
  });
};
