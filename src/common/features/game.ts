import Room from "./Room"

export default abstract class Game {
  private room: Room

  constructor(room) {
    this.room = room
  }
}
