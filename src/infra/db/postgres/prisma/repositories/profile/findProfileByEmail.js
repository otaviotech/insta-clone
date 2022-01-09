import { Profile } from '../../../../../../domain/entities/profile';

export class PrismaFindProfileByEmailRepository {
  #prisma;

  constructor({ prisma }) {
    this.#prisma = prisma;
  }

  async findByEmail(email) {
    const prismaProfile = await this.#prisma.profile.findFirst({
      where: { email },
    });

    if (!prismaProfile) {
      return undefined;
    }

    return new Profile(prismaProfile);
  }
}
