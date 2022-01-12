export class PrismaIsFollowingRepository {
  #prisma;

  constructor({ prisma }) {
    this.#prisma = prisma;
  }

  async isFollowing(input) {
    const result = await this.#prisma.profile.count({
      where: {
        followerId: input.followedId,
        followedId: input.followedId,
      },
    });

    return result?.number > 0;
  }
}
