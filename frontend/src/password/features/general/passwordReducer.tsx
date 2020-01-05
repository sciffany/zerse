import produce from "immer"
import { ADD_SOCKET, CREATE_ERROR } from "./passwordActions"
import { PasswordState } from "./passwordTypes"
import { SET_ROOM_NAME } from "../signup/signupActions"

const defaultState: PasswordState = {
  socket: null,
  error: null,
  roomName: null,
  roomUsers: []
}

const passwordReducer = (prev = defaultState, action: any) =>
  produce(prev, nxt => {
    switch (action.type) {
      case ADD_SOCKET:
        nxt.socket = action.payload
        break
      case CREATE_ERROR:
        nxt.error = action.payload
        break
      case SET_ROOM_NAME:
        nxt.roomName = action.payload
        break
    }
  })
export default passwordReducer
