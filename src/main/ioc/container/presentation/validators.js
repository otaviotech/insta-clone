import awlix from 'awilix';

import {
  SignUpInputValidator,
  SignInInputValidator,
} from '../../../../presentation/validators/auth';

import { FollowInputValidator } from '../../../../presentation/validators/profile';

export const registerValidators = (container) => {
  container.register({
    signUpInputValidator: awlix.asClass(SignUpInputValidator),
    signInInputValidator: awlix.asClass(SignInInputValidator),

    followInputValidator: awlix.asClass(FollowInputValidator),
  });
};
