import { Router } from 'express';
import { AuthRouter } from './auth';

const routers = [AuthRouter];

export const registerRoutes = (app) => {
  const v1Router = Router();

  routers.forEach((router) => {
    v1Router.use(router.prefix, router.router);
  });

  app.use('/v1', v1Router);
};
