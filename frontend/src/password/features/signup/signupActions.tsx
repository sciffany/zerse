export type RoomName = string

export const SET_ROOM_NAME = "SET_ROOM_NAME"

export const setRoomName = (roomName: RoomName) => ({
  type: SET_ROOM_NAME,
  payload: roomName
})
