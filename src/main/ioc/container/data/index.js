import { registerUseCases } from './usecases';

export const registerDataLayer = (container) => {
  registerUseCases(container);
};
