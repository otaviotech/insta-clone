[![codecov](https://codecov.io/gh/otaviotech/insta-clone/branch/main/graph/badge.svg?token=Y4MRTD9DM4)](https://codecov.io/gh/otaviotech/insta-clone) ![GitHub Workflow Status](https://img.shields.io/github/workflow/status/otaviotech/insta-clone/ci)

# insta-clone

This is a more pragmatic version of ts-monorepo.

# Why "insta-clone" ?

Just a hyped data model to reproduce.

# Motivation

Although TypeScript is very nice, I rewrote it with plain JavaScript using ES6 syntax.
_Still clean architeture inspired._

# Stack

- Prisma (for PostgreSQL)
- IORedis (for Redis)
- awilix (IoC Container)
- bcrypt (to hash and compare passowords)
- pino (for logs)
- sentry (for monitoring)
- jsonwebtoken
- yup (for schema validation)
- express
- express-async-errors
- express-ruid (to generate a unique id for each request, useful for debug production logs)
- helmet (for express security)
- redoc
- ramda
- dotenv

# Dev stack

- jest
- dotenv-cli
- eslint (airbnb)
- prettier
- supertest
- husky
