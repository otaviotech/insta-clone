import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import ruid from 'express-ruid';
import { pinoHttpMiddleware } from './pino';

export const registerMiddlewares = (app) => {
  app.use(ruid());
  app.use(pinoHttpMiddleware);
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(cors());
};
