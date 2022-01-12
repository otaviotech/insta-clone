import { asClass } from 'awilix';

import {
  PrismaAddFollowerRepository,
  PrismaFindManyProfilesByIdRepository,
  PrismaFindProfileByEmailRepository,
  PrismaFindProfileByUsername,
  PrismaIsFollowingRepository,
  PrismaProfileRepository,
} from '../../../../../infra/db/postgres/prisma/repositories/profile';

export const registerProfileRepositories = (container) => {
  container.register({
    addFollowerRepository: asClass(PrismaAddFollowerRepository),
    findManyProfilesByIdsRepository: asClass(
      PrismaFindManyProfilesByIdRepository,
    ),
    findProfileByEmailRepository: asClass(PrismaFindProfileByEmailRepository),
    findProfileByUsernameRepository: asClass(PrismaFindProfileByUsername),
    profileRepository: asClass(PrismaProfileRepository),
    isFollowingRepository: asClass(PrismaIsFollowingRepository),
  });
};
