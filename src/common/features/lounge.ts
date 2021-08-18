import Room from "../features/room";

export default abstract class Lounge {
  public roomMap: Map<string, Room>;

  constructor() {
    this.roomMap = new Map<string, Room>();
  }

  findRoomByName(roomname: string): Room {
    if (!roomname) {
      throw new Error("Room name cannot be empty.");
    }
    const room = this.roomMap.get(roomname);
    return room;
  }

  abstract createNewRoom(roomName: string): Room;

  createRoom(roomname: string): Room {
    const newRoom = this.createNewRoom(roomname);
    this.roomMap.set(roomname, newRoom);
    return newRoom;
  }

  deleteRoom(roomname: string) {
    this.roomMap.delete(roomname);
  }
}
