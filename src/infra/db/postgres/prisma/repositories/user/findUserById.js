import { User } from '../../../../../../domain/entities/user';

export class PrismaFindUserByIdRepository {
  #prisma;

  constructor({ prisma }) {
    this.#prisma = prisma;
  }

  async findById(id) {
    const prismaUser = await this.#prisma.user.findFirst({
      where: { id },
    });

    if (!prismaUser) {
      return undefined;
    }

    return new User(prismaUser);
  }
}
