import Room from "./password-room";

export default class User {
  private id: number;
  public name: string;
  private room: Room;

  constructor(name: string, room: Room) {
    this.name = name;
    this.room = room;
    room.addWatcher(this);
  }
}
