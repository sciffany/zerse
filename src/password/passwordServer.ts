import Lounge from "common/features/lounge";

import GameServer from "../gameServer";
import handleSignup from "./handlers/signup";
import handleSignout from "./handlers/signout";
import handleApplyPosition from "./handlers/applyPosition";
import handleStartGame from "./handlers/startGame";
import PasswordLounge from "./features/passwordLounge";
import { PasswordSocket } from "./passwordTypes";

export class PasswordServer extends GameServer {
  private lounge: Lounge;

  constructor() {
    super("/password");
    this.lounge = new PasswordLounge();
  }

  handleSocket(socket: PasswordSocket) {
    handleSignup(socket, this.gameIo, this.lounge);
    handleApplyPosition(socket, this.gameIo, this.lounge);
    handleStartGame(socket, this.gameIo, this.lounge);
    handleSignout(socket, this.gameIo, this.lounge);
  }
}
