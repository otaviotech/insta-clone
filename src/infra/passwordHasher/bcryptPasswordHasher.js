import bcrypt from 'bcrypt';

const SALT = 12;

export class BcryptPasswordHasher {
  // eslint-disable-next-line class-methods-use-this
  async hashPassword(password) {
    const hashed = await bcrypt.hash(password, SALT);
    return hashed;
  }
}
