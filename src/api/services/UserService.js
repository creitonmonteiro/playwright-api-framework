import {expect} from '@playwright/test';

export default class UserService {
  constructor (usersClient) {
    this.usersClient = usersClient;
  }

  async createUser (user, expectedStatus = 201) {
    const response = await this.usersClient.createUser (user);

    expect (response.status ()).toBe (expectedStatus);

    return response.json ();
  }

  async updateUser (id, user, expectedStatus = 200) {
    const response = await this.usersClient.updateUser (id, user);

    expect (response.status ()).toBe (expectedStatus);

    return response.json ();
  }

  async deleteUser (id, expectedStatus = 200) {
    const response = await this.usersClient.deleteUser (id);

    expect (response.status ()).toBe (expectedStatus);

    return response.json ();
  }

  async getUser (id, expectedStatus = 200) {
    const response = await this.usersClient.getUser (id);

    expect (response.status ()).toBe (expectedStatus);

    return response.json ();
  }
}
