import { asClass } from 'awilix';
import { JwtTokenGenerator } from '../../../../infra/authTokenGenerator/jwtTokenGenerator';
import { BcryptPasswordHashComparer } from '../../../../infra/passwordHashComparer/bcryptPasswordHashComparer';
import { BcryptPasswordHasher } from '../../../../infra/passwordHasher/bcryptPasswordHasher';

export const registerAuth = (container) => {
  container.register({
    authTokenGenerator: asClass(JwtTokenGenerator),
    passwordHashComparer: asClass(BcryptPasswordHashComparer),
    passwordHasher: asClass(BcryptPasswordHasher),
  });
};
