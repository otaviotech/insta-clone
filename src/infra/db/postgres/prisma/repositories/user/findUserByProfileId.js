export class PrismaFindUserByProfileIdRepository {
  #prisma;

  constructor({ prisma }) {
    this.#prisma = prisma;
  }

  async findByProfileId(id) {
    const prismaUser = await this.#prisma.user.findFirst({
      where: { id },
    });

    if (!prismaUser) {
      return undefined;
    }

    return prismaUser;
  }
}
