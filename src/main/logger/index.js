import pino from 'pino';
import pinoPretty from 'pino-pretty';
import { AppEnv } from '../env';

const isProduction = AppEnv.NODE_ENV === 'production';

export const appLogger = pino({
  prettyPrint: isProduction ? null : { levelFirst: true },
  prettifier: isProduction ? null : pinoPretty({ colorize: true }),
});
