import bcrypt from 'bcrypt';

const SALT = 12;

export class BcryptPasswordHasher {
  async hashPassword(password) {
    const hashed = await bcrypt.hash(password, SALT);
    return hashed;
  }
}
