import User from "./password-user";

export default class Room {
  public name: string;
  private watchers: User[] = [];
  private a1: User;
  private a2: User;
  private b1: User;
  private b2: User;

  constructor(name: string) {
    this.name = name;
  }

  addWatcher(User: User) {
    this.watchers.push(User);
  }

  equals(otherRoom: Room) {
    otherRoom.name = this.name;
  }
}
