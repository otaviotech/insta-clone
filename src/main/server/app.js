import express from 'express';
import { registerMiddlewares } from './middlewares';
import { errorMiddleware } from './middlewares/error';
import { registerRoutes } from './routes';

const app = express();

registerMiddlewares(app);
registerRoutes(app);

// This needs to go after all routes, because it will catch the errors thrown by them.
app.use(errorMiddleware);

export { app };
