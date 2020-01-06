import Lounge from "src/common/features/lounge"
import Room from "common/features/room"
import PasswordRoom from "./room"

export default class PasswordLounge extends Lounge {
  constructor() {
    super()
  }

  newRoom(roomName) {
    return new PasswordRoom(roomName, this)
  }
}
