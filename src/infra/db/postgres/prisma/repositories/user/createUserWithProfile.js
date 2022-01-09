export class PrismaCreateUserWithProfileRepository {
  #prisma;

  constructor(prisma) {
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

    const u = await this.#prisma.user.create({
      data: payload,
    });

    return { id: u.id };
  }
}
