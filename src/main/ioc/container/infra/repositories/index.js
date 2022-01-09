import { registerProfileRepositories } from './profile';
import { registerUserRepositories } from './user';

export const registerRepositories = (container) => {
  registerProfileRepositories(container);
  registerUserRepositories(container);
};
