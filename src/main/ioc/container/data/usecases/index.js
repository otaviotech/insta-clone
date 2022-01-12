import { registerAuthUseCases } from './auth';
import { registerProfileUseCases } from './profile';

export const registerUseCases = (container) => {
  registerAuthUseCases(container);
  registerProfileUseCases(container);
};
