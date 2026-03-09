import {expect} from '@playwright/test';

export default class ProductService {
  constructor (productsClient) {
    this.productsClient = productsClient;
  }

  async createProduct (product, expectedStatus = 201) {
    const response = await this.productsClient.createProduct (product);

    expect (response.status ()).toBe (expectedStatus);

    return response.json ();
  }

}
