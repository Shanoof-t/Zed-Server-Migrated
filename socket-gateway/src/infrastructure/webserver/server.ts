import e from "express";
import http, { Server } from "node:http";

export default (): Server => {
  const app = e();

  const server = http.createServer(app);
  return server;
};
