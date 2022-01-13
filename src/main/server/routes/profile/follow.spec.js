import supertest from 'supertest';
import {
  disconnectDatabase,
  resetDatabase,
} from '../../../../../test/utils/db';
import { prismaClient } from '../../../../infra/db/postgres/prisma';
import { app } from '../../app';

const followerInDb = {
  email: 'follower@email.com',
  username: 'follower',
  password: 'abc123',
};

const followedInDb = {
  email: 'followed@email.com',
  username: 'followed',
  password: 'abc123',
};

const createUserInDb = async (userToCreate) => {
  const response = await supertest(app)
    .post('/v1/auth/signup')
    .set('Content-Type', 'application/json')
    .send(userToCreate);

  const user = await prismaClient.user.findFirst({
    where: { id: response.body.data.id },
    include: {
      profiles: true,
    },
  });

  return user;
};

describe('Follow Integration Test', () => {
  beforeEach(resetDatabase);
  afterAll(disconnectDatabase);

  it('should follow another profile', async () => {
    const [follower, followed] = await Promise.all([
      createUserInDb(followerInDb),
      createUserInDb(followedInDb),
    ]);

    const loginResponse = await supertest(app)
      .post('/v1/auth/signin')
      .send({
        identifier: followerInDb.email,
        password: followerInDb.password,
      })
      .set('Content-Type', 'application/json');

    const { jwt } = loginResponse.body.data;

    const followResponse = await supertest(app)
      .post(`/v1/profile/${followed.profiles[0].id}/follow`)
      .set('Authorization', `Bearer ${jwt}`)
      .send({
        followerProfileId: follower.profiles?.[0].id,
      });

    expect(followResponse.statusCode).toBe(200);
    expect(followResponse.body.data).toEqual({ status: 'CONFIRMED' });
  });
});
