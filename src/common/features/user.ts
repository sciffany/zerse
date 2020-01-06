import Room from "./room"
import { PositionNumber } from "./position"

export type UserName = string
export type UserId = number

export default class User {
  static idAssign: UserId = 1
  public id: UserId
  public name: UserName
  private room: Room
  private position: PositionNumber

  constructor(name: string, room: Room) {
    this.name = name
    this.room = room
    this.id = User.idAssign++
  }

  changePosition(position: PositionNumber) {
    this.position = position
  }
}
