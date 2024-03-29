import { createServer, Server } from "http";
import * as express from "express";
import * as SocketIO from "socket.io";
import { PasswordSocket } from "password/passwordTypes";

export default abstract class GameServer {
  private app: any;
  private server: Server;
  private ioServer: SocketIO.Server;
  private static readonly PORT: Number = 4001;
  public gameIo;

  abstract handleSocket(socket: SocketIO.Socket): void;

  constructor(gameRoute: string) {
    this.initializeApp(gameRoute);
    this.listen();
  }
  initializeApp(gameRoute: string) {
    this.app = express();
    this.server = createServer(this.app);
    this.ioServer = SocketIO(this.server);
    this.gameIo = this.ioServer.of(gameRoute);
  }

  getApp() {
    return this.app;
  }

  listen() {
    this.server.listen(process.env.PORT || GameServer.PORT, () =>
      console.log(`Listening on port ${process.env.PORT || GameServer.PORT}`)
    );

    this.gameIo.on("connection", (socket: PasswordSocket) => {
      console.log(socket.id, "connected");
      this.handleSocket(socket);
    });
  }
}
