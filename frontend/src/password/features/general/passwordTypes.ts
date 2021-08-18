import { RoomName } from "../signup/signupActions";
import { UserName } from "../users/UserTypes";

export interface PasswordState {
  socket: SocketIOClient.Socket | null;
  error: string | null;
  userName: UserName | null;
  roomName: RoomName | null;
  roomUsers: UserName[] | null;
  roomPositions: UserName[] | null;
}

export type ServiceArgs = {
  socket: SocketIOClient.Socket;
  history: any;
  dispatch: any;
};
