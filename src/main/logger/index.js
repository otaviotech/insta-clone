import pino from 'pino';
import pinoPretty from 'pino-pretty';
import { createWriteStream } from 'pino-sentry';
import { AppEnv } from '../env';
import { adaptLogTags, adaptRequestForLogging } from './utils';

const isProduction = AppEnv.NODE_ENV === 'production';
const isTest = AppEnv.NODE_ENV === 'test';
const SERIALIZATION_DEPTH = 10;

const sentryStream = createWriteStream({
  dsn: AppEnv.SENTRY_DSN,
  level: 'warning',
  messageAttributeKey: 'err.message',
  stackAttributeKey: 'err.stack',
  normalizeDepth: SERIALIZATION_DEPTH,
});

const prettyPrint = isProduction ? false : { levelFirst: true };
const prettifier = isProduction ? undefined : pinoPretty({ colorize: true });

const pinoLogger = pino(
  {
    depthLimit: SERIALIZATION_DEPTH,
    prettyPrint,
    prettifier,
    level: isTest ? 'error' : 'debug',
  },
  pino.multistream([sentryStream, process.stdout]),
);

export const appLogger = Object.assign(pinoLogger, {
  errorWithRequest: (error, req) => {
    pinoLogger.error({
      err: error,
      extra: {
        request: adaptRequestForLogging(req),
      },
      tags: adaptLogTags(req),
    });
  },
});
