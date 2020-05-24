import * as SocketIO from "socket.io"
import User from "common/features/user"
import Room from "common/features/room"

export type Word = string

export type PasswordSocket = SocketIO.Socket & {
  user: User
  room: Room
}
