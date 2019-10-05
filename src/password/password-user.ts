import Room from "./password-room"

export default class User {
  static idAssign: number = 0
  public id: number
  public name: string
  private room: Room

  constructor(name: string, room: Room) {
    this.name = name
    this.room = room
    room.addWatcher(this)
    this.id = User.idAssign
    User.idAssign++
  }

  equals(otherUser: User) {
    return otherUser.name === this.name
  }
}
