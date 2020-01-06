import GameServer from "../server"
import handleSignup from "./handlers/signup"
import handleSignout from "./handlers/signout"
import handleApplyPosition from "./handlers/applyPosition"

import Lounge from "common/features/lounge"

type SignupDetails = {
  userName: string
  roomName: string
}

export class PasswordServer extends GameServer {
  private lounge: Lounge

  constructor() {
    super()
    this.lounge = new Lounge()
  }

  getGameRoute() {
    return "/password"
  }

  handleSocket(socket) {
    handleSignup(socket, this.gameIo, this.lounge)
    handleApplyPosition(socket, this.gameIo, this.lounge)
    handleSignout(socket, this.gameIo, this.lounge)
  }
}
