/** @type {import('@jest/types').Config.InitialOptions} */
const jestConfig = {
  testRegex: ['.spec.js$'],
  transform: {},
  moduleFileExtensions: ['js'],
  testEnvironment: './test/integration/prisma.environment.js',
};

export default jestConfig;
