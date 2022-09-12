import { createServer } from "http";
import express from 'express';
import * as SocketIO from "socket.io";
import { PasswordSocket } from "password/passwordTypes";
import { createAdapter } from "@socket.io/cluster-adapter"
import { setupWorker } from "@socket.io/sticky"
import { Server } from "socket.io";

export default abstract class GameServer {
  private app: any;
  private server: any;
  private ioServer: SocketIO.Server;
  private static readonly PORT: Number = 8080;
  public gameIo;

  abstract handleSocket(socket: SocketIO.Socket): void;

  constructor(gameRoute: string) {
    this.initializeApp(gameRoute);
    this.listen();
  }
  initializeApp(gameRoute: string) {
    this.app = express();
    this.server = createServer(this.app);
    this.ioServer = new Server(this.server);
    this.ioServer.adapter(createAdapter());
    setupWorker(this.ioServer);
    this.gameIo = this.ioServer.of(gameRoute);
  }

  getApp() {
    return this.app;
  }

  listen() {
    this.server.listen(process.env.PORT || GameServer.PORT, () =>
      console.log(`Listening on port ${process.env.PORT || GameServer.PORT}`)
    );

    this.gameIo.on("connection", (socket: any) => {
      console.log(socket.id, "connected");
      this.handleSocket(socket);
    });
  }
}
