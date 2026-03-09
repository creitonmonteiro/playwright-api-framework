import {expect} from '@playwright/test';

export default class AuthService {
  constructor (loginClient) {
    this.loginClient = loginClient;
  }

  async login (user, expectedStatus = 200) {
    const response = await this.loginClient.login (user);

    expect (response.status ()).toBe (expectedStatus);
    return response.json();
  }
}
