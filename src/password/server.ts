import GameServer from "../server"
import handleSignup from "./handlers/signup"
import handleSignout from "./handlers/signout"
import handlePositionAssign from "./handlers/positionAssign"

import Lounge from "common/features/lounge"

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
    handleSignout(socket, this.gameIo, this.lounge)
    handlePositionAssign(socket, this.gameIo, this.lounge)
  }
}
