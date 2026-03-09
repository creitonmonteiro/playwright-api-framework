export default class BaseClient {
  constructor (request) {
    this.request = request;
  }

  async get (path) {
    return this.request.get (path);
  }

  async post (path, body) {
    return this.request.post (path, {
      data: body,
    });
  }

  async put (path, body) {
    return this.request.put (path, {
      data: body,
    });
  }

  async delete (path) {
    return this.request.delete (path);
  }
}
