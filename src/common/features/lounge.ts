import Room, { RoomName, RoomId } from "../features/room"

export default class Lounge {
  private rooms: Room[]

  constructor() {
    this.rooms = []
  }

  findRoomByName(roomName: RoomName): Room {
    return this.rooms.find(room => room.name === roomName)
  }

  findRoomById(roomId: RoomId): Room {
    return this.rooms.find(room => room.id === roomId)
  }

  createRoom(roomName: RoomName): Room {
    const newRoom = new Room(roomName, this)
    this.rooms.push(newRoom)
    return newRoom
  }

  getRoomNameFromId(roomId: RoomId): RoomName {
    return this.findRoomById(roomId).name
  }

  deleteRoom(roomId: RoomId) {
    const index = this.rooms.findIndex(room => room.id === roomId)
    this.rooms[index] = undefined
  }
}
