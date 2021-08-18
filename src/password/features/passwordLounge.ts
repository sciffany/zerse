import Lounge from "common/features/lounge";
import Room from "common/features/room";
import PasswordRoom from "./passwordRoom";

export default class PasswordLounge extends Lounge {
  constructor() {
    super();
  }

  createNewRoom(roomName: string) {
    return new PasswordRoom(roomName);
  }
}
