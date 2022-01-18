import NodeEnvironment from 'jest-environment-node';
import { nanoid } from 'nanoid';
import util from 'util';
import * as childProcess from 'child_process';

import { AppEnv } from '../../src/main/env';
import { prismaClient } from '../../src/infra/db/postgres/prisma';

const exec = util.promisify(childProcess.exec);

const prismaBinary = './node_modules/.bin/prisma2';

class PrismaTestEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    this.schema = `test_${nanoid()}`;
    this.connectionString = AppEnv.DATABASE_URL.replace(
      'schema=public',
      `schema=${this.schema}`,
    );
  }

  async setup() {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;

    await exec(`${prismaBinary} migrate reset --force`);

    return super.setup();
  }

  async teardown() {
    await prismaClient.$disconnect();
  }
}

export default PrismaTestEnvironment;
