import { jest } from '@jest/globals';

export const createPrismaMock = () => ({
  user: {
    findFirst: jest.fn(),
    create: jest.fn(),
  },
  profile: {
    findFirst: jest.fn(),
  },
});
