/* eslint-disable no-console */
import { AppEnv } from '../env';
import { app } from './app';

process.on('uncaughtException', (error) => {
  console.error(error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.error(error);
  process.exit(1);
});

app
  .listen(AppEnv.PORT)
  .on('listening', () => {
    console.log(`Server is ready for requests at port ${AppEnv.PORT}.`);
  })
  .on('error', (error) => {
    console.error(error);
    process.exit(1);
  });
