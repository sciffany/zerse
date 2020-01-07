import Lounge from "common/features/lounge"
import Room, { RoomName } from "common/features/room"
import PasswordRoom from "./room"

export default class PasswordLounge extends Lounge {
  constructor() {
    super()
  }

  createNewRoom(roomName: RoomName) {
    return new PasswordRoom(roomName, this)
  }
}
