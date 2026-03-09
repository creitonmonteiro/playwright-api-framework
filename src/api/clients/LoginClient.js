import BaseClient from './BaseClient.js';

export default class LoginClient extends BaseClient {
  constructor (request) {
    super (request);
  }

  /**
   * Perform user login
   * @param {Object} credentials
   * @param {string} credentials.email
   * @param {string} credentials.password
   * @returns {Promise<Response>}
   */
  async login (credentials) {
    return this.post ('/login', {
      email: credentials.email,
      password: credentials.password,
    });
  }
}
