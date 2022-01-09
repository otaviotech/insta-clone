import { asClass } from 'awilix';

import {
  PrismaFindProfileByEmailRepository,
  PrismaFindProfileByUsername,
  PrismaProfileRepository,
} from '../../../../../infra/db/postgres/prisma/repositories/profile';

export const registerProfileRepositories = (container) => {
  container.register({
    findProfileByEmailRepository: asClass(PrismaFindProfileByEmailRepository),
    findProfileByUsernameRepository: asClass(PrismaFindProfileByUsername),
    profileRepository: asClass(PrismaProfileRepository),
  });
};
