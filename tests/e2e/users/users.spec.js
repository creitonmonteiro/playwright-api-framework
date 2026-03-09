import {test, expect} from '@playwright/test';

import UsersClient from '@clients/UsersClient';

import UserService from '@services/UserService';

import {createUserPayload} from '@factories/userFactory';
import {deleteUserIfExists} from '@utils/userHelper';

import {validateSchema} from '@utils/schemaValidator';

import {createDefaultSchema} from '@schemas/common/createDefault.schema';
import {defaultSchema} from '@schemas/common/default.schema.js';
import { findUserSchema } from '@schemas/user/findUser.schema';

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
      validateSchema (createDefaultSchema, body);

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
      validateSchema (createDefaultSchema, body);
    });

    await test.step ('create user duplicated', async () => {
      body = await userService.createUser (duplicateUser, 400);
    });

    await test.step ('validate user created', async () => {
      validateSchema (defaultSchema, body);

      expect (body.message).toBe ('Este email já está sendo usado');
    });
  });

  test ('should update a user successfully', async ({request}) => {
    const usersClient = new UsersClient (request);

    const userService = new UserService (usersClient);

    const fakeUser = createUserPayload ();

    let body;
    let userId;

    await test.step ('create user', async () => {
      const response = await userService.createUser (fakeUser);
      userId = response._id;
    });

    await test.step ('update user', async () => {
      body = await userService.updateUser (userId, fakeUser);
    });

    await test.step ('validate user updated', async () => {
      validateSchema (defaultSchema, body);
      expect (body.message).toBe ('Registro alterado com sucesso');
    });
  });

  test ('should update a user by invalid id', async ({request}) => {
    const usersClient = new UsersClient (request);

    const userService = new UserService (usersClient);

    const fakeUser = createUserPayload ();

    let body;

    await test.step ('update user', async () => {
      body = await userService.updateUser ('0pxpPY0cbmQhpYz1', fakeUser, 400);
    });

    await test.step ('validate user updated', async () => {
      validateSchema (defaultSchema, body);
      expect (body.message).toBe ('Usuário não encontrado');
    });
  });

  test ('should delete a user successfully', async ({request}) => {
    const usersClient = new UsersClient (request);

    const userService = new UserService (usersClient);

    const fakeUser = createUserPayload ();

    let body;
    let userId;

    await test.step ('create user', async () => {
      const response = await userService.createUser (fakeUser);
      userId = response._id;
    });

    await test.step ('delete user', async () => {
      body = await userService.deleteUser (userId);
    });

    await test.step ('validate user updated', async () => {
      validateSchema (defaultSchema, body);
      expect (body.message).toBe ('Registro excluído com sucesso');
    });
  });

  test ('should be delete a user by invalid id', async ({request}) => {
    const usersClient = new UsersClient (request);

    const userService = new UserService (usersClient);

    let body;

    await test.step ('search user', async () => {
      body = await userService.deleteUser ('0pxpPY0cbmQhpYz1');
    });

    await test.step ('validate user deleted', async () => {
      validateSchema (defaultSchema, body);
      expect (body.message).toBe ('Nenhum registro excluído');
    });
  });

  test ('should be find a user by id successfully', async ({request}) => {
    const usersClient = new UsersClient (request);

    const userService = new UserService (usersClient);

    const fakeUser = createUserPayload ();

    let body;
    let response;

    await test.step ('create user', async () => {
      response = await userService.createUser (fakeUser);
    });

    await test.step ('search user', async () => {
      body = await userService.getUser (response._id);
    });

    await test.step ('validate user searched', async () => {
      validateSchema (findUserSchema, body);
      expect (body.email).toBe (fakeUser.email);
      expect (body.password).toBe(fakeUser.password);
    });
  });

  test ('should be find a user by invalid id', async ({request}) => {
    const usersClient = new UsersClient (request);

    const userService = new UserService (usersClient);

    let body;

    await test.step ('search user', async () => {
      body = await userService.getUser ('0pxpPY0cbmQhpYz1', 400);
    });

    await test.step ('validate user searched', async () => {
      validateSchema (defaultSchema, body);
      expect (body.message).toBe ('Usuário não encontrado');
    });
  });
});
