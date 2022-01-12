import { User } from '../../../../../../domain/entities/user';

export class PrismaFindUserByProfileIdRepository {
  #prisma;

  constructor({ prisma }) {
    this.#prisma = prisma;
  }

  async findByProfileId(id) {
    const prismaUser = await this.#prisma.profile.findFirst({
      where: { id },
      include: {
        user: true,
      },
    });

    if (!prismaUser) {
      return undefined;
    }

    return new User(prismaUser.user);
  }
}
