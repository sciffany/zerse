import Room from "./room";
import { PositionNumber } from "./position";
import { PositionType } from "password/handlers/startGame";

export default class User {
  public username: string;
  private room: Room;
  private position: PositionNumber;
  public socketId: string;

  constructor(name: string, socketId: string, room: Room) {
    this.username = name;
    this.socketId = socketId;
    this.room = room;
  }

  changePosition(position: PositionNumber) {
    this.position = position;
  }

  getName(): string {
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
