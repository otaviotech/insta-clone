import { Router } from 'express';
import { ApiSpecRouter } from './apiSpec';
import { AuthRouter } from './auth';
import { ProfileRouter } from './profile';

const routers = [ApiSpecRouter, AuthRouter, ProfileRouter];

export const registerRoutes = (app) => {
  const v1Router = Router();

  routers.forEach((router) => {
    v1Router.use(router.prefix, router.router);
  });

  app.use('/v1', v1Router);
};
