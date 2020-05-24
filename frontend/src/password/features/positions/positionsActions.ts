import { UserName } from "../users/UserTypes"

export type RoomName = string

export const SET_ROOM_NAME = "SET_ROOM_NAME"
export const SET_ROOM_USERS = "SET_ROOM_USERS"
export const SET_ROOM_POSITIONS = "SET_ROOM_POSITIONS"

export const setRoomPositions = (roomPositions: UserName[]) => {
  return {
    type: SET_ROOM_POSITIONS,
    payload: roomPositions
  }
}
