import {test, expect} from '@playwright/test';

import UsersClient from '@clients/UsersClient';
import LoginClient from '@clients/LoginClient';

import AuthService from '@services/AuthService';
import UserService from '@services/UserService';

import {validateSchema} from '@utils/schemaValidator';

import {loginSchema} from '@schemas/user/login.schema.js';
import {errorSchema} from '@schemas/common/error.schema.js';

import {createUserPayload} from '@factories/userFactory';
import userData from '@fixtures/users.json';

test.describe ('Login API', () => {
  test ('should login successfully', async ({request}) => {
    const usersClient = new UsersClient (request);
    const loginClient = new LoginClient (request);

    const userService = new UserService (usersClient);
    const authService = new AuthService (loginClient);

    const fakeUser = createUserPayload ();

    let body;

    await test.step ('create user', async () => {
      await userService.createUser (fakeUser);
    });

    await test.step ('login with valid user', async () => {
      body = await authService.login (fakeUser);
    });

    await test.step ('validate login', async () => {
      validateSchema (loginSchema, body);

      expect(body.authorization).toMatch(/^Bearer\s[\w-]+\.[\w-]+\.[\w-]+$/);
    });
  });

  test ('should fail login with invalid credentials', async ({request}) => {
    const loginClient = new LoginClient (request);

    const authService = new AuthService (loginClient);

    let body;

    await test.step ('login with invalid user', async () => {
      body = await authService.login (userData.invalid, 401);
    });

    await test.step ('validate invalid login', async () => {
      validateSchema (errorSchema, body);

      expect (body.message).toBe ('Email e/ou senha inválidos');
    });
  });
});
