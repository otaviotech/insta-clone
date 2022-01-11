import awlix from 'awilix';

import {
  AuthenticateUserByTokenUseCase,
  SignInUseCase,
  SignOutUseCase,
  SignUpUseCase,
} from '../../../../../data/usecases/auth';

export const registerAuthUseCases = (container) => {
  container.register({
    authenticateUserByTokenUseCase: awlix.asClass(
      AuthenticateUserByTokenUseCase,
    ),
    signInUseCase: awlix.asClass(SignInUseCase),
    signOutUseCase: awlix.asClass(SignOutUseCase),
    signUpUseCase: awlix.asClass(SignUpUseCase),
  });
};
