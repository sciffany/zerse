import Room from "./room";
import { PositionNumber } from "./position";
import { PositionType } from "password/handlers/startGame";

export type UserName = string;
export type UserId = number;
export type SocketId = string;

export default class User {
  static idAssign: UserId = 1;
  public id: UserId;
  public username: UserName;
  private room: Room;
  private position: PositionNumber;
  public socketId: SocketId;
  private positionType: PositionType;
  private teamNumber: number;

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

  getPositionType(roundNumber: number): PositionType {
    return (roundNumber + this.position) % 2 === 0
      ? PositionType.HINTER
      : PositionType.GUESSER;
  }

  getTeamNumber(): number {
    return Math.floor(this.position / 2);
  }
}
