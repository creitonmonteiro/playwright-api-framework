import { startMockServer } from "../mock/server.js";

let server;

export default async function globalSetup() {
  server = await startMockServer(3001);
}