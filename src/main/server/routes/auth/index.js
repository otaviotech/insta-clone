import { Router } from 'express';
import { container } from '../../../ioc/container';
import { adapt } from '../../adapters/expressRoute';
import { adaptMiddleware } from '../../adapters/expressMiddleware';
import { appLogger } from '../../../logger';

const router = Router();

const authMiddleware = adaptMiddleware(
  container.resolve('authMiddleware'),
  appLogger,
);

router.post('/signin', adapt(container.resolve('signInController')));

router.post(
  '/signout',
  authMiddleware,
  adapt(container.resolve('signOutController')),
);

router.post('/signup', adapt(container.resolve('signUpController')));

export const AuthRouter = {
  prefix: '/auth',
  router,
};
