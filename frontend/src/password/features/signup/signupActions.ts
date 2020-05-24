import { UserName } from "../users/UserTypes"

export type RoomName = string

export const SET_USER_AND_ROOM = "SET_USER_AND_ROOM"
export const SET_ROOM_USERS = "SET_ROOM_USERS"

export const setUserAndRoom = (userName: UserName, roomName: RoomName) => {
  return {
    type: SET_USER_AND_ROOM,
    payload: { userName, roomName }
  }
}

export const setRoomUsers = (roomUsers: UserName[]) => {
  return {
    type: SET_ROOM_USERS,
    payload: roomUsers
  }
}
