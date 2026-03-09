import {test, expect} from '@playwright/test';

import UsersClient from '@clients/UsersClient';
import LoginClient from '@clients/LoginClient';
import ProductsClient from '@clients/ProductsClient';

import UserService from '@services/UserService';
import AuthService from '@services/AuthService';
import ProductService from '@services/ProductService';

import {createUserPayload} from '@factories/userFactory';
import {deleteUserIfExists} from '@utils/userHelper';

import {createProductPayload} from '@factories/productFactory';

import {createDefaultSchema} from '@schemas/common/createDefault.schema';

import {validateSchema} from '@utils/schemaValidator';

test.describe ('Product API', () => {
  test.only ('should create a new product successfully', async ({request}) => {
    const usersClient = new UsersClient (request);
    const loginClient = new LoginClient (request);
    const productsClient = new ProductsClient (request);

    const userService = new UserService (usersClient);
    const authService = new AuthService (loginClient);
    const productService = new ProductService (productsClient);

    const fakeUser = createUserPayload ();
    const fakerProduct = createProductPayload ();

    let body;
    let responseLogin;

    await test.step ('create user', async () => {
      await userService.createUser (fakeUser);
    });

    await test.step ('login with valid user', async () => {
      responseLogin = await authService.login (fakeUser);
    });

    await test.step ('create product', async () => {
      body = await productService.createProduct (fakerProduct, responseLogin.authorization);
    });

    await test.step ('validate product created', async () => {
      validateSchema (createDefaultSchema, body);

      expect (body.message).toBe ('Cadastro realizado com sucesso');
    });
  });
});
