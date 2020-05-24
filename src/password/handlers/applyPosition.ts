import Lounge from "common/features/lounge"
import { PasswordSocket } from "password/passwordTypes"

type ApplyPositionDetails = {
  position: number
}

export default function handleApplyPosition(socket, gameIo, lounge: Lounge) {
  socket.on("applyPosition", handler(socket, gameIo, lounge))
}

const handler = (socket: PasswordSocket, gameIo, _: Lounge) => ({
  position,
}: ApplyPositionDetails) => {
  console.log("apply position from", socket.user.name, position)

  const { user, room } = socket
  try {
    if (room.isPositionEmpty(position)) {
      room.assignPosition(position, user.id)
    }
    if (room.arePositionsFilled()) {
      gameIo.to(room.getLeader().socketId).emit("readyPlay")
    }
    gameIo.to(room.id).emit("roomPositions", room.getPositions())
  } catch (err) {
    socket.emit("errorMessage", err.message)
  }
}
