export class PrismaIsFollowingRepository {
  #prisma;

  constructor({ prisma }) {
    this.#prisma = prisma;
  }

  async isFollowing(input) {
    const count = await this.#prisma.follow.count({
      where: {
        followerId: input.followerId,
        followedId: input.followedId,
      },
    });

    return count > 0;
  }
}
