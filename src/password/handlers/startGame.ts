import Lounge from "common/features/lounge"

export default function handlePlayGame(socket, gameIo, lounge: Lounge) {
  socket.on("startGame", handler(socket, gameIo, lounge))
}

const handler = (socket, gameIo, lounge: Lounge) => () => {
  const { userId, roomId } = socket
  try {
    gameIo.to(roomId).emit("startGameSuccess")
  } catch (err) {
    socket.emit("errorMessage", err.message)
  }
}
