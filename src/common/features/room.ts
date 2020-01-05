import User, { UserName, UserId } from "./user"
import Lounge from "./lounge"

export type RoomName = string
export type RoomId = number

export default class Room {
  static idAssign: RoomId = -1
  public id: RoomId
  public name: RoomName
  private users: User[]
  private capacity: number
  private lounge: Lounge

  constructor(name: string, lounge: Lounge) {
    this.name = name
    this.lounge = lounge
    this.id = Room.idAssign++
    this.users = []
  }

  createUser(userName: UserName): User {
    if (this.findUserByName(userName)) {
      throw Error("User already exists")
    }

    const newUser = new User(userName, this)
    this.users.push(newUser)
    return newUser
  }

  findUserByName(userName: UserName): User {
    return this.users.find(user => user.name === userName)
  }

  findUserById(userId: UserId): User {
    return this.users.find(user => user.id === userId)
  }

  getUserNames(): UserName[] {
    return this.users.filter(user => !!user).map(user => user.name)
  }

  deleteUser(userId: UserId): void {
    const index = this.users.findIndex(user => user.id === userId)
    this.users[index] = undefined
  }

  isEmpty(): boolean {
    return !this.users.length
  }
}
