import Lounge from "common/features/lounge"

type PlayerPositionDetails = {
  positionName: string
}

export default function handlePositionAssign(socket, gameIo, lounge) {
  socket.on("playerPosition", handler(socket, gameIo, lounge))
}

const handler = (socket, gameIo, lounge: Lounge) => ({
  positionName
}: PlayerPositionDetails) => {
  const { roomId, userId } = socket

  const user = lounge.findRoomByName(roomId).findUserById(userId)

  gameIo.to(roomId).emit("playerPosition", {
    positionName,
    userName: user.name
  })
}
