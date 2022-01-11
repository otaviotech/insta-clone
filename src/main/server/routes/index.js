import { Router } from 'express';
import { ApiSpecRouter } from './apiSpec';
import { AuthRouter } from './auth';
import { FeedRouter } from './feed';

const routers = [ApiSpecRouter, AuthRouter, FeedRouter];

export const registerRoutes = (app) => {
  const v1Router = Router();

  routers.forEach((router) => {
    v1Router.use(router.prefix, router.router);
  });

  app.use('/v1', v1Router);
};
