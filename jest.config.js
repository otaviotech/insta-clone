/** @type {import('@jest/types').Config.InitialOptions} */
const jestConfig = {
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  setupFilesAfterEnv: ['./test/setup.js'],
};

export default jestConfig;
