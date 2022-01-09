export class PrismaFindProfileByUsername {
  #prisma;

  constructor(prisma) {
    this.#prisma = prisma;
  }

  async findByUsername(username) {
    const prismaProfile = await this.#prisma.profile.findFirst({
      where: { username },
    });

    if (!prismaProfile) {
      return undefined;
    }

    return prismaProfile;
  }
}
