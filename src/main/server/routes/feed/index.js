import { Router } from 'express';
import { container } from '../../../ioc/container';
import { adaptMiddleware } from '../../adapters/expressMiddleware';
import { appLogger } from '../../../logger';

const router = Router();

router.use(adaptMiddleware(container.resolve('authMiddleware'), appLogger));

router.get('/', (req, res) => res.sendStatus(200));

export const FeedRouter = {
  prefix: '/feed',
  router,
};
