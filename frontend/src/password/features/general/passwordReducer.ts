import produce from "immer";
import { ADD_SOCKET, CREATE_ERROR, DELETE_ERROR } from "./passwordActions";
import { PasswordState } from "./passwordTypes";
import { SET_USER_AND_ROOM, SET_ROOM_USERS } from "../signup/signupActions";
import { SET_ROOM_POSITIONS } from "../positions/positionsActions";

const defaultState: PasswordState = {
  socket: null,
  error: null,
  userName: null,
  roomName: null,
  roomUsers: [],
  roomPositions: [],
};

const passwordReducer = (prev = defaultState, action: any) =>
  produce(prev, (nxt) => {
    switch (action.type) {
      case ADD_SOCKET:
        nxt.socket = action.payload;
        break;
      case CREATE_ERROR:
        nxt.error = action.payload;
        break;
      case SET_USER_AND_ROOM:
        nxt.userName = action.payload.userName;
        nxt.roomName = action.payload.roomName;
        break;
      case SET_ROOM_USERS:
        nxt.roomUsers = action.payload;
        break;
      case SET_ROOM_POSITIONS:
        nxt.roomPositions = action.payload;
        break;
      case DELETE_ERROR:
        nxt.error = null;
        break;
    }
  });
export default passwordReducer;
