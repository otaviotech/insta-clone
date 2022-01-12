export class PrismaAddFollowerRepository {
  #prisma;

  constructor({ prisma }) {
    this.#prisma = prisma;
  }

  async addFollower(input) {
    const result = await this.#prisma.follow.create({
      data: {
        followerId: input.followedId,
        followedId: input.followedId,
      },
    });

    const { status } = result;

    return { status };
  }
}
