import {test, expect} from '@playwright/test';

import ProductsClient from '@clients/ProductsClient';

import ProductService from '@services/ProductService';

import {createProductPayload} from '@factories/productFactory';

import {createDefaultSchema} from '@schemas/common/createDefault.schema';

import {validateSchema} from '@utils/schemaValidator';

test.describe ('Product API', () => {
  test ('should create a new product successfully', async ({request}) => {
    const productsClient = new ProductsClient (request);

    const productService = new ProductService (productsClient);

    const fakerProduct = createProductPayload ();

    let body;

    await test.step ('create product', async () => {
      body = await productService.createProduct (fakerProduct);
    });

    await test.step ('validate product created', async () => {
      validateSchema (createDefaultSchema, body);

      expect (body.message).toBe ('Cadastro realizado com sucesso');
    });
  });
});
