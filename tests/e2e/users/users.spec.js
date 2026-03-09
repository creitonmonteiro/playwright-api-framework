import {test, expect} from '@playwright/test';

import UsersClient from '@clients/UsersClient';

import UserService from '@services/UserService';

import {createUserPayload} from '@factories/userFactory';
import {deleteUserIfExists} from '@utils/userHelper';

import {validateSchema} from '@utils/schemaValidator';

import {createUserSchema} from '@schemas/user/createUser.schema';
import {errorSchema} from '@schemas/common/error.schema.js';

import userData from '@fixtures/users.json';

test.describe ('User API', () => {
  test ('should create a new user successfully', async ({request}) => {
    const usersClient = new UsersClient (request);

    const userService = new UserService (usersClient);

    const fakeUser = createUserPayload ();

    let body;

    await test.step ('create user', async () => {
      body = await userService.createUser (fakeUser);
    });

    await test.step ('validate user created', async () => {
      validateSchema (createUserSchema, body);

      expect (body.message).toBe ('Cadastro realizado com sucesso');
    });
  });

  test ('should create a new user with a duplicate email', async ({
    request,
  }) => {
    const usersClient = new UsersClient (request);

    const userService = new UserService (usersClient);

    const duplicateUser = userData.duplicate;

    let body;

    await test.step ('cleanup existing user', async () => {
      await deleteUserIfExists (usersClient, duplicateUser);
    });

    await test.step ('create user successfully', async () => {
      body = await userService.createUser (duplicateUser);
      validateSchema (createUserSchema, body);
    });

    await test.step ('create user duplicated', async () => {
      body = await userService.createUser (duplicateUser, 400);
    });

    await test.step ('validate user created', async () => {
      validateSchema (errorSchema, body);

      expect (body.message).toBe ('Este email já está sendo usado');
    });
  });
});
