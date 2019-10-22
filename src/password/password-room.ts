import User from "./password-user"

interface PlayerOrder {
  [key: string]: string
}

export default class Room {
  public name: string
  private watchers: User[] = []
  private playerOrder: PlayerOrder = {}
  private playerFull: boolean

  constructor(name: string) {
    this.name = name
  }

  addWatcher(user: User) {
    console.log(user.name)
    if (this.watchers.some(watcher => watcher.equals(user))) {
      throw new Error("User already inside")
    }
    this.watchers.push(user)
  }

  equals(otherRoom: Room) {
    return otherRoom.name === this.name
  }

  getWatchers(): string {
    return this.watchers
      .filter(watcher => watcher != undefined)
      .map(watcher => watcher.name)
      .join(", ")
  }

  removeWatcher(userId) {
    this.watchers[userId] = undefined
  }

  addDetail(detail) {
    this.playerOrder[detail.code] = detail.name
  }

  getPlayerOrder() {
    return this.playerOrder
  }
}
