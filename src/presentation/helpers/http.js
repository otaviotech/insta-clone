import { InputValidationError } from '../errors';

import {
  EmailAlreadyTakenError,
  ForbiddenError,
  InvalidCredentialsError,
  ResourceNotFoundError,
  UsernameAlreadyTakenError,
} from '../../domain/errors';

export const getStatusCodeForError = (error) => {
  const statusByError = {
    [ResourceNotFoundError.name]: 404,
    [ForbiddenError.name]: 403,
    [InvalidCredentialsError.name]: 400,
    [InputValidationError.name]: 400,
    [UsernameAlreadyTakenError.name]: 400,
    [EmailAlreadyTakenError.name]: 400,
  };

  return statusByError[error.name];
};

export const badRequest = (error) => ({
  statusCode: getStatusCodeForError(error),
  error,
});
