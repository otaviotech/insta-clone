import { appLogger } from '../../logger';

// eslint-disable-next-line no-unused-vars
export const errorMiddleware = (err, req, res, next) => {
  appLogger.error(err);
  res.sendStatus(500);
};
