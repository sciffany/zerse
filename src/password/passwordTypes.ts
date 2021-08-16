import * as SocketIO from "socket.io";
import User from "common/features/user";
import Room from "common/features/room";
import PasswordRoom from "./features/passwordRoom";

export type Word = string;

export type PasswordSocket = {
  user: User;
  room: PasswordRoom;
  emit: Function;
  id: string;
  on: Function;
};
