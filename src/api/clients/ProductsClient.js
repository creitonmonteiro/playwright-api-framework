import BaseClient from './BaseClient.js';

export default class ProductsClient extends BaseClient {
  constructor (request) {
    super (request);
  }

  /**
   * Create a new product
   * @param {Object} product
   * @param {string} product.nome
   * @param {int} product.preco
   * @param {string} product.descricao
   * @param {int} product.quantidade
   * @returns {Promise<Response>}
   */
  async createProduct (product, token) {
    return this.request.post ('/produtos', {
      data: product,
      headers: {Authorization: token},
    });
  }
}
