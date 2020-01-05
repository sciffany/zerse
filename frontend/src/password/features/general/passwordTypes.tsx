import { RoomName } from "../signup/signupActions"
import { UserName } from "../users/UserTypes"

// export interface PasswordState {
//   roomName: string
//   playerName: string
//   listOfNames: string[]
//   playerOrder: PlayerOrder
//   socket: any
//   assigned: boolean
// }

export interface PasswordState {
  socket: SocketIOClient.Socket | null
  error: string | null
  roomName: RoomName | null
  roomUsers: UserName[] | null
}

// interface PlayerDetail {
//   code: string
//   name: string
// }

// interface RoomDetail {
//   listOfNames: string[]
//   playerOrder: PlayerOrder
// }

// interface PlayerOrder {
//   [key: string]: string
// }
