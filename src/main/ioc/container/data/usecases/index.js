import { registerAuthUseCases } from './auth';

export const registerUseCases = (container) => {
  registerAuthUseCases(container);
};
