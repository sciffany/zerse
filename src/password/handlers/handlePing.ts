import Lounge from "common/features/lounge";
import { PasswordSocket } from "password/passwordTypes";

export default function handlePing(socket, gameIo, lounge: Lounge) {
  socket.on("/password/ping", handler(socket, gameIo, lounge));
}

const handler = (socket: PasswordSocket, gameIo, _: Lounge) => async () => {
  try {
  } catch (err) {
    socket.emit("errorMessage", err.message);
  }
};
