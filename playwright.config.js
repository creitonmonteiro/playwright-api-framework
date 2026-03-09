import 'module-alias/register';

export default {
  timeout: 30000,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 4 : 2,

  reporter: [['list'], ['allure-playwright']],

  globalSetup: './tests/setup.js',

  use: {
    baseURL: 'http://localhost:3001',
  },
};
