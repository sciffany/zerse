import Lounge from "common/features/lounge"

export default function handlePlayGame(socket, gameIo, lounge: Lounge) {
  socket.on("play", handler(socket, gameIo, lounge))
}

const handler = (socket, gameIo, lounge: Lounge) => () => {
  const { userId, roomId } = socket
  try {
  } catch (err) {
    socket.emit("errorMessage", err.message)
  }
}
