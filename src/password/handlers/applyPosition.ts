import Lounge from "common/features/lounge"

type ApplyPositionDetails = {
  position: number
}

export default function handleApplyPosition(socket, gameIo, lounge: Lounge) {
  socket.on("applyPosition", handler(socket, gameIo, lounge))
}

const handler = (socket, gameIo, lounge: Lounge) => ({
  position
}: ApplyPositionDetails) => {
  const { userId, roomId } = socket
  try {
    const room = lounge.findRoomById(roomId)
    if (room.isPositionEmpty(position)) {
      room.assignPosition(position, userId)
    }
    gameIo.to(room.id).emit("roomPositions", room.getPositions())
  } catch (err) {
    socket.emit("errorMessage", err.message)
  }
}
