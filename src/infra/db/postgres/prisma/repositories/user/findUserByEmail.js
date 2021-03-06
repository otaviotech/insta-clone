import { User } from '../../../../../../domain/entities/user';

export class PrismaFindUserByEmailRepository {
  #prisma;

  constructor({ prisma }) {
    this.#prisma = prisma;
  }

  async findByEmail(email) {
    const prismaUser = await this.#prisma.user.findFirst({
      where: { email },
    });

    if (!prismaUser) {
      return undefined;
    }

    return new User(prismaUser);
  }
}
