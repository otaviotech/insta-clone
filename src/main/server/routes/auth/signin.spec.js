import supertest from 'supertest';
import { resetDatabase } from '../../../../../test/utils/db';
import { app } from '../../app';

const userInDb = {
  email: 'johndoe@email.com',
  username: 'jdoe',
  password: 'abc123',
};

const createUserInDb = async () =>
  supertest(app)
    .post('/v1/auth/signup')
    .set('Content-Type', 'application/json')
    .send(userInDb);

describe('SignIn Integration Test', () => {
  beforeEach(resetDatabase);

  it('should login using with email', async () => {
    await createUserInDb();
    const loginResponse = await supertest(app)
      .post('/v1/auth/signin')
      .send({
        identifier: userInDb.email,
        password: userInDb.password,
      })
      .set('Content-Type', 'application/json');

    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body.data.jwt).toBeDefined();
  });

  it('should login using with username', async () => {
    await createUserInDb();
    const loginResponse = await supertest(app)
      .post('/v1/auth/signin')
      .send({
        identifier: userInDb.username,
        password: userInDb.password,
      })
      .set('Content-Type', 'application/json');

    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body.data.jwt).toBeDefined();
  });
});
