import bcrypt from 'bcrypt';

export class BcryptPasswordHashComparer {
  async comparePasswords(left, right) {
    const passwordsMatch = await bcrypt.compare(left, right);
    return passwordsMatch;
  }
}
