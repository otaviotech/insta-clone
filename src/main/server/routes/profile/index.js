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

router.use(authMiddleware);

router.post('/:profileId/follow', adapt(container.resolve('followController')));

export const ProfileRouter = {
  prefix: '/profile',
  router,
};
