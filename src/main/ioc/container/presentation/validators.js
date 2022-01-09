import awlix from 'awilix';

import { SignUpInputValidator } from '../../../../presentation/validators/auth/signupInputValidator';

export const registerValidators = (container) => {
  container.register({
    signUpInputValidator: awlix.asClass(SignUpInputValidator),
  });
};
