import User, { UserName, UserId, SocketId } from "./user"
import Lounge from "./lounge"
import { PositionNumber } from "./position"
import Game from "./game"

export type RoomName = string
export type RoomId = number

export default abstract class Room {
  static idAssign: RoomId = 1
  public id: RoomId
  public name: RoomName
  private users: User[]
  private positions: User[]
  private lounge: Lounge
  protected abstract capacity: number
  public game: Game

  constructor(name: string, lounge: Lounge) {
    this.name = name
    this.lounge = lounge
    this.id = Room.idAssign++
    this.users = []
    this.positions = []
  }

  addGame(game: Game) {
    this.game = game
  }

  createUser(userName: UserName, socketId: SocketId): User {
    if (this.findUserByName(userName)) {
      throw new Error("User already exists")
    }

    const newUser = new User(userName, socketId, this)
    this.users.push(newUser)
    return newUser
  }

  existingUsers() {
    return this.users.filter((user) => !!user)
  }

  findUserByName(userName: UserName): User {
    if (!userName) {
      throw new Error("User name cannot be empty.")
    }
    return this.existingUsers().find((user) => user.getName() === userName)
  }

  findUserById(userId: UserId): User {
    const user = this.existingUsers().find((user) => user.id === userId)
    if (!user) {
      throw new Error("Cannot find user.")
    }
    return user
  }

  getUserNames(): UserName[] {
    return this.existingUsers().map((user) => user.getName())
  }

  deleteUser(userId: UserId): void {
    const index = this.users.findIndex((user) => user && user.id === userId)
    if (index === undefined) {
      throw new Error("Cannot find user to delete.")
    }
    this.users[index] = undefined
  }

  isEmpty(): boolean {
    return !this.existingUsers().length
  }

  isPositionEmpty(position: PositionNumber): boolean {
    return !this.positions[position]
  }

  assignPosition(position: PositionNumber, userId: UserId) {
    this.deleteUserFromPositions(userId)
    const user = this.findUserById(userId)
    this.positions[position] = user
    user.changePosition(position)
  }

  deleteUserFromPositions(userId: UserId) {
    const index = this.positions.findIndex((user) => user && user.id === userId)
    this.positions[index] = undefined
  }

  getPositions(): UserName[] {
    return this.positions.map((user) => (user ? user.getName() : undefined))
  }

  getLeader(): User {
    return this.users.find((user) => !!user)
  }

  arePositionsFilled(): boolean {
    return this.positions.filter((user) => !!user).length === this.capacity
  }
}
