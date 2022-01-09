import awlix from 'awilix';

import { SignUpUseCase } from '../../../../../data/usecases/auth/signup';

export const registerAuthUseCases = (container) => {
  container.register({
    signUpUseCase: awlix.asClass(SignUpUseCase),
  });
};
