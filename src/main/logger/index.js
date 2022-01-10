import pino from 'pino';
import pinoPretty from 'pino-pretty';
import { createWriteStream } from 'pino-sentry';
import { AppEnv } from '../env';

const isProduction = AppEnv.NODE_ENV === 'production';
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

export const appLogger = pino(
  {
    depthLimit: SERIALIZATION_DEPTH,
    prettyPrint,
    prettifier,
  },
  pino.multistream([sentryStream, process.stdout]),
);
