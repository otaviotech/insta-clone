import supertest from 'supertest';
import { resetDatabase } from '../../../../../test/utils/db';
import {
  EmailAlreadyTakenError,
  UsernameAlreadyTakenError,
} from '../../../../domain/errors';
import { prismaClient } from '../../../../infra/db/postgres/prisma';
import { app } from '../../app';

const validInput = {
  email: 'johndoe@email.com',
  username: 'jdoe',
  password: 'strongpassword!',
};

const createUserInDb = async () =>
  prismaClient.user.create({
    data: {
      email: validInput.email,
      password: 'some_hash',
      profiles: {
        create: {
          email: validInput.email,
          username: validInput.username,
        },
      },
    },
  });

describe('SignUp Integration Test', () => {
  beforeEach(resetDatabase);
  afterAll(resetDatabase);

  it('should create a new user with a profile', async () => {
    const response = await supertest(app)
      .post('/v1/auth/signup')
      .send(validInput)
      .set('Content-Type', 'application/json');

    const newUser = await prismaClient.user.findFirst({
      where: { id: response.body.data.id },
      include: {
        profiles: true,
      },
    });

    expect(response.statusCode).toBe(201);

    expect(response.body.data).toEqual({ id: expect.any(Number) });
    expect(response.body.error).toBeUndefined();

    expect(newUser.id).toEqual(response.body.data.id);
    expect(newUser.email).toEqual(validInput.email);
    expect(newUser.profiles[0].email).toEqual(validInput.email);
    expect(newUser.profiles[0].username).toEqual(validInput.username);
  });

  it('should not create another user with the same email', async () => {
    await createUserInDb();

    const response = await supertest(app)
      .post('/v1/auth/signup')
      .send(validInput)
      .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(400);
    expect(response.body.error.name).toBe(EmailAlreadyTakenError.name);
    expect(response.body.data).toBeUndefined();
  });

  it('should not create another user with the same username', async () => {
    await createUserInDb();

    const response = await supertest(app)
      .post('/v1/auth/signup')
      .send({
        ...validInput,
        email: 'unique@email.com',
      })
      .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(400);
    expect(response.body.error.name).toBe(UsernameAlreadyTakenError.name);
    expect(response.body.data).toBeUndefined();
  });
});
