import Lounge from "common/features/lounge"
import PasswordGame from "password/features/passwordGame"
import { PasswordSocket } from "password/passwordTypes"

export default function handlePlayGame(socket, gameIo, lounge: Lounge) {
  socket.on("startGameRequest", handler(socket, gameIo, lounge))
}

const handler = (socket: PasswordSocket, gameIo, _: Lounge) => async () => {
  const { user, room } = socket
  try {
    console.log("start game requested for password")
    gameIo.to(room.id).emit("startGameSuccess")
    gameIo.to(room.id).emit("roomPositions", room.getPositions())

    new PasswordGame(room)
  } catch (err) {
    socket.emit("errorMessage", err.message)
  }
}
