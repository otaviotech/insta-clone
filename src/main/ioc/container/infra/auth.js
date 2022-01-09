import { asClass, asValue } from 'awilix';
import { JwtTokenGenerator } from '../../../../infra/auth/authTokenGenerator/jwtTokenGenerator';
import { BcryptPasswordHashComparer } from '../../../../infra/auth/passwordHashComparer/bcryptPasswordHashComparer';
import { BcryptPasswordHasher } from '../../../../infra/auth/passwordHasher/bcryptPasswordHasher';
import { AppEnv } from '../../../env';

export const registerAuth = (container) => {
  container.register({
    authTokenGenerator: asValue(new JwtTokenGenerator(AppEnv.AUTH_SECRET)),
    passwordHashComparer: asClass(BcryptPasswordHashComparer),
    passwordHasher: asClass(BcryptPasswordHasher),
  });
};
