import Room from "./room";
import { PositionNumber } from "./position";

export type UserName = string;
export type UserId = number;
export type SocketId = number;

export default class User {
  static idAssign: UserId = 1;
  public id: UserId;
  private username: UserName;
  private room: Room;
  private position: PositionNumber;
  public socketId: SocketId;

  constructor(name: string, socketId: SocketId, room: Room) {
    this.username = name;
    this.socketId = socketId;
    this.room = room;
    this.id = User.idAssign++;
  }

  changePosition(position: PositionNumber) {
    this.position = position;
  }

  getName(): UserName {
    return this.username;
  }

  getRoom(): Room {
    return this.room;
  }

  getPosition(): PositionNumber {
    return this.position;
  }
}
