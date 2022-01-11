import awlix from 'awilix';

import {
  SignInUseCase,
  SignUpUseCase,
  AuthenticateUserByTokenUseCase,
} from '../../../../../data/usecases/auth';

export const registerAuthUseCases = (container) => {
  container.register({
    signUpUseCase: awlix.asClass(SignUpUseCase),
    signInUseCase: awlix.asClass(SignInUseCase),
    authenticateUserByTokenUseCase: awlix.asClass(
      AuthenticateUserByTokenUseCase,
    ),
  });
};
