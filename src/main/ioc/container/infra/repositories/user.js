import { asClass } from 'awilix';

import {
  PrismaCreateUserWithProfileRepository,
  PrismaFindUserByEmailRepository,
  PrismaFindUserByProfileIdRepository,
  PrismaUserRepository,
} from '../../../../../infra/db/postgres/prisma/repositories/user';

export const registerUserRepositories = (container) => {
  container.register({
    createUserWithProfileRepository: asClass(
      PrismaCreateUserWithProfileRepository,
    ),
    findUserByEmailRepository: asClass(PrismaFindUserByEmailRepository),
    findUserByProfileIdRepository: asClass(PrismaFindUserByProfileIdRepository),
    userRepository: asClass(PrismaUserRepository),
  });
};
