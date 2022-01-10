/* eslint-disable no-console */
import { AppEnv } from '../env';
import { appLogger } from '../logger';
import { app } from './app';

process.on('uncaughtException', (error) => {
  appLogger.error(error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  appLogger.error(error);
  process.exit(1);
});

app
  .listen(AppEnv.PORT)
  .on('listening', () => {
    appLogger.info(`Server is ready for requests at port ${AppEnv.PORT}.`);
  })
  .on('error', (error) => {
    appLogger.error(error);
    process.exit(1);
  });
