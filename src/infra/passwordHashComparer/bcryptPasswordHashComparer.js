import bcrypt from 'bcrypt';

export class BcryptPasswordHashComparer {
  // eslint-disable-next-line class-methods-use-this
  async comparePasswords(left, right) {
    const passwordsMatch = await bcrypt.compare(left, right);
    return passwordsMatch;
  }
}
