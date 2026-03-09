import BaseClient from './BaseClient.js';

export default class UsersClient extends BaseClient {
  constructor (request) {
    super (request);
  }

  /**
   * Create a new user
   * @param {Object} user
   * @param {string} user.nome
   * @param {string} user.email
   * @param {string} user.password
   * @param {boolean} user.administrador
   * @returns {Promise<Response>}
   */
  async createUser (user) {
    return this.request.post ('/usuarios', {
      data: user,
    });
  }

  /**
   * Get user by id
   * @param {string} userId
   * @returns {Promise<Response>}
   */
  async getUser (userId) {
    return this.get (`/usuarios/${userId}`);
  }

  /**
   * Update an existing user
   * @param {string} userId
   * @param {Object} user
   * @param {string} user.nome
   * @param {string} user.email
   * @param {string} user.password
   * @param {boolean} user.administrador
   * @returns {Promise<Response>}
   */
  async updateUser (userId, user) {
    return this.put (`/usuarios/${userId}`, user);
  }

  /**
   * Delete a user by id
   * @param {string} userId
   * @returns {Promise<Response>}
   */
  async deleteUser (userId) {
    return this.delete (`/usuarios/${userId}`);
  }

  /**
   * List all users
   * @returns {Promise<Response>}
   */
  async listUsers () {
    return this.get ('/usuarios');
  }
}
