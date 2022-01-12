import { Profile } from '../../../../../../domain/entities/profile';

export class PrismaFindManyProfilesByIdRepository {
  #prisma;

  constructor({ prisma }) {
    this.#prisma = prisma;
  }

  async findManyProfilesByIds(ids) {
    const prismaProfiles = await this.#prisma.profile.findMany({
      where: { id: { in: ids } },
    });

    if (!prismaProfiles?.length) {
      return [];
    }

    return prismaProfiles.map((p) => new Profile(p));
  }
}
