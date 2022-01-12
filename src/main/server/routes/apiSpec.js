import { Router } from 'express';
import cors from 'cors';
import { AppEnv } from '../../env';

const router = Router();

router.get('/', cors(), (req, res) => {
  res.sendFile('spec.html', { root: AppEnv.PUBLIC_DIR });
});

export const ApiSpecRouter = {
  prefix: '/spec',
  router,
};
