import { User } from '../../../../../../domain/entities/user';

export class PrismaCreateUserWithProfileRepository {
  #prisma;

  constructor({ prisma }) {
    this.#prisma = prisma;
  }

  async createWithProfile(input) {
    const payload = {
      email: input.email,
      password: input.password,
      profiles: {
        create: [{ username: input.username, email: input.email }],
      },
    };

    const prismaUser = await this.#prisma.user.create({
      data: payload,
    });

    return new User(prismaUser);
  }
}
