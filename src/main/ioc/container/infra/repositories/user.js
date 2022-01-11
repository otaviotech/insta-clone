import { asClass } from 'awilix';

import {
  PrismaCreateUserWithProfileRepository,
  PrismaFindUserByEmailRepository,
  PrismaFindUserByProfileIdRepository,
  PrismaUserRepository,
  PrismaFindUserByIdRepository,
} from '../../../../../infra/db/postgres/prisma/repositories/user';

export const registerUserRepositories = (container) => {
  container.register({
    createUserWithProfileRepository: asClass(
      PrismaCreateUserWithProfileRepository,
    ),
    findUserByEmailRepository: asClass(PrismaFindUserByEmailRepository),
    findUserByProfileIdRepository: asClass(PrismaFindUserByProfileIdRepository),
    findUserByIdRepository: asClass(PrismaFindUserByIdRepository),
    userRepository: asClass(PrismaUserRepository),
  });
};
