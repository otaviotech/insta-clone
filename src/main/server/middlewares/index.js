import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import ruid from 'express-ruid';

export const registerMiddlewares = (app) => {
  app.use(ruid());
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(cors());
};
