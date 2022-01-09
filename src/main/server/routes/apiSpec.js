import { Router } from 'express';
import { AppEnv } from '../../env';

const router = Router();

router.get('/', (req, res) => {
  res.sendFile('spec.html', { root: AppEnv.PUBLIC_DIR });
});

export const ApiSpecRouter = {
  prefix: '/spec',
  router,
};
