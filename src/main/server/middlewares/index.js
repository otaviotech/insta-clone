import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import ruid from 'express-ruid';
import { pinoHttpMiddleware } from './pino';

export const registerMiddlewares = (app) => {
  app.use(ruid());
  app.use(pinoHttpMiddleware);
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        scriptSrc: ["'self'", 'blob:', "'unsafe-inline'", 'unpkg.com'],
      },
    }),
  );
  app.use(bodyParser.json());
  app.use(cors());
};
