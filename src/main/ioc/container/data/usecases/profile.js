import { asClass } from 'awilix';
import { FollowUseCase } from '../../../../../data/usecases/profile';

export const registerProfileUseCases = (container) => {
  container.register({
    followUseCase: asClass(FollowUseCase),
  });
};
