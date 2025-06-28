import { DefaultEventsMap, Server } from "socket.io";
import environment from "./environment";
import http from "node:http";

export default class Socket {
  private server: http.Server<
    typeof http.IncomingMessage,
    typeof http.ServerResponse
  >;

  public io: Server<
    DefaultEventsMap,
    DefaultEventsMap,
    DefaultEventsMap,
    any
  > | null = null;

  constructor(
    server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
  ) {
    this.server = server;
  }

   init() {
    this.io = new Server(this.server, {
      cors: {
        origin: environment.ALLOWED_ORIGINS?.split(","),
        credentials: true,
      },
    });

    return this.io;
  }


}
