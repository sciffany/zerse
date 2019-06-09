import { Server } from "http";
import User from "./password-user";
import Room from "./password-room";
import Express from "express";
import SocketIO from "socket.io";

export class PasswordServer {
  private static readonly PORT: Number = 4001;
  private express = require("express");
  private http = require("http");
  private socketIO = require("socket.io");
  private app: Express.Application;
  private server: Server;
  private ioServer: SocketIO.Server;
  private passwordio;
  private roomList: Room[] = [];

  constructor() {
    this.initializeApp();
    this.listen();
  }

  initializeApp() {
    this.app = this.express();
    this.server = this.http.createServer(this.app);
    this.ioServer = this.socketIO(this.server);
    this.passwordio = this.ioServer.of("/password");
  }

  getApp(): Express.Application {
    return this.app;
  }

  listen() {
    this.server.listen(PasswordServer.PORT, () =>
      console.log(`Listening on port ${PasswordServer.PORT}`)
    );
    this.passwordio.on("connection", socket => {
      socket.on("sign up", details => {
        const callback = () => {
          let roomToJoin: Room = this.roomList.find(
            room => room.name === details.room
          );

          if (!roomToJoin) {
            roomToJoin = new Room(details.room);
            this.roomList.push(roomToJoin);
          }

          const user = new User(details.name, roomToJoin);
          console.log(details.room);

          // this.passwordio.emit("person joined", roomToJoin.getWatchers());

          this.ioServer
            .to(details.room)
            .emit("person joined", roomToJoin.getWatchers());
        };

        socket.join(details.room, callback);
      });

      socket.on("disconnect", () => {
        this.passwordio.emit("user disconnect");
        console.log("User disconnected");
      });
    });
  }
}
