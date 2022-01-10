import pinoHttp from 'pino-http';
import { appLogger } from '../../logger';

export const pinoHttpMiddleware = pinoHttp({
  logger: appLogger,
  genReqId: (req) => req.rid,
});
