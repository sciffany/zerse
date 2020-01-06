import Room, { RoomName, RoomId } from "../features/room"

export default class Lounge {
  private rooms: Room[]

  constructor() {
    this.rooms = []
  }

  existingRooms() {
    return this.rooms.filter(room => !!room)
  }

  findRoomByName(roomName: RoomName): Room {
    if (!roomName) {
      throw new Error("Room name cannot be empty.")
    }
    return this.existingRooms().find(room => room.name === roomName)
  }

  findRoomById(roomId: RoomId): Room {
    const room = this.existingRooms().find(room => room.id === roomId)
    if (!room) {
      throw new Error("Cannot find room.")
    }
    return room
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
    const index = this.rooms.findIndex(room => room && room.id === roomId)
    if (index === undefined) {
      throw new Error("Cannot find room to delete.")
    }
    this.rooms[index] = undefined
  }
}
