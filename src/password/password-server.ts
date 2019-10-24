import { Server } from "http"
import User from "./password-user"
import Room from "./password-room"
import Express from "express"
import SocketIO from "socket.io"
import { disconnect } from "cluster"

export class PasswordServer {
  private static readonly PORT: Number = 4001
  private express = require("express")
  private http = require("http")
  private socketIO = require("socket.io")
  private app: Express.Application
  private server: Server
  private ioServer: SocketIO.Server
  private passwordio
  private roomList: Room[] = []

  constructor() {
    this.initializeApp()
    this.routeStuff()
    this.listen()
  }

  initializeApp() {
    this.app = this.express()
    this.server = this.http.createServer(this.app)
    this.ioServer = this.socketIO(this.server)
    this.passwordio = this.ioServer.of("/password")
  }

  routeStuff() {
    this.app.get("/api", async (req, res) => {
      try {
        res.json({ moo: "moo" })
      } catch (err) {}
    })
  }

  getApp(): Express.Application {
    return this.app
  }

  listen() {
    this.server.listen(PasswordServer.PORT, () =>
      console.log(`Listening on port ${PasswordServer.PORT}`)
    )
    // this.passwordio.on("connection", socket => {
    //   var roomName
    //   var userId
    //   socket.on("sign up", details => {
    //     let roomToJoin: Room = this.roomList.find(
    //       room => room.name === details.room
    //     )

    //     if (!roomToJoin) {
    //       roomToJoin = new Room(details.room)
    //       this.roomList.push(roomToJoin)
    //     }

    //     try {
    //       const user = new User(details.name, roomToJoin)
    //       userId = user.id
    //       console.log(userId)
    //     } catch (err) {
    //       socket.emit("err", "User with that name already inside")
    //     }

    //     socket.join(details.room)
    //     this.passwordio.to(details.room).emit("person joined", {
    //       listOfNames: roomToJoin.getWatchers(),
    //       playerOrder: roomToJoin.getPlayerOrder()
    //     })
    //     roomName = details.room
    //   })

    //   socket.on("player order", details => {
    //     const detail = { code: details.code, name: details.name }
    //     this.findRoomByName(roomName).addDetail(detail)
    //     this.passwordio.to(roomName).emit("person order", detail)
    //   })

    //   socket.on("disconnect", () => {
    //     if (!roomName) {
    //       return
    //     }
    //     this.findRoomByName(roomName).removeWatcher(userId)
    //     this.passwordio
    //       .to(roomName)
    //       .emit(
    //         "user disconnected",
    //         this.findRoomByName(roomName).getWatchers()
    //       )
    //   })
    // })
  }

  findRoomByName(roomName): Room {
    return this.roomList.find(room => room.name === roomName)
  }
}
