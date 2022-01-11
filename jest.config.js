/** @type {import('@jest/types').Config.InitialOptions} */
const jestConfig = {
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  setupFilesAfterEnv: ['./test/setup.js'],
};

export default jestConfig;
