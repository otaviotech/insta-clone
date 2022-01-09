import { Router } from 'express';
import { container } from '../../../ioc/container';
import { adapt } from '../../adapters/expressRoute';

const router = Router();

router.post('/signup', adapt(container.resolve('signUpController')));

router.post('/signin', () => {});

export const AuthRouter = {
  prefix: '/auth',
  router,
};
