/** @type {import('@jest/types').Config.InitialOptions} */
const jestConfig = {
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  transform: {},
  testRegex: ['.test.js$'],
  setupFilesAfterEnv: ['./test/setup.js'],
};

export default jestConfig;
