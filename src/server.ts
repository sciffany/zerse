import { createServer, Server } from "http"
import * as express from "express"
import * as SocketIO from "socket.io"

export default abstract class GameServer {
  private app
  private server: Server
  private ioServer: SocketIO.Server
  private static readonly PORT: Number = 4001

  gameIo
  abstract handleSocket(socket: SocketIO.Socket): void

  constructor(gameRoute: string) {
    this.initializeApp(gameRoute)
    this.listen()
  }

  initializeApp(gameRoute: string) {
    this.app = express()
    this.server = createServer(this.app)
    this.ioServer = SocketIO(this.server)
    this.gameIo = this.ioServer.of(gameRoute)
  }

  getApp() {
    return this.app
  }

  listen() {
    this.server.listen(GameServer.PORT, () =>
      console.log(`Listening on port ${GameServer.PORT}`)
    )

    this.gameIo.on("connection", socket => {
      console.log(socket.id, "connected")
      this.handleSocket(socket)
    })
  }
}
