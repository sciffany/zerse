import Room from "./room"

export type UserName = string
export type UserId = number

export default class User {
  static idAssign: UserId = 1
  public id: UserId
  public name: UserName
  private room: Room

  constructor(name: string, room: Room) {
    this.name = name
    this.room = room
    this.id = User.idAssign++
  }
}
