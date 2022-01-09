import path, { dirname } from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

/* eslint-disable no-underscore-dangle */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
/* eslint-enable no-underscore-dangle */

export const AppEnv = {
  PROJECT_ROOT: path.resolve(__dirname, '../../'),
  SOURCES_ROOT: path.resolve(__dirname, '../'),
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT,
  AUTH_SECRET: process.env.AUTH_SECRET,
  SENTRY_DSN: process.env.SENTRY_DSN,
  NODE_ENV: process.env.NODE_ENV || 'development',
};
