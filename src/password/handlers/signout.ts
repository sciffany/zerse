import Lounge from "common/features/lounge"

export default function handleSignout(socket, gameIo, lounge: Lounge) {
  const signOut = () => {
    console.log(socket.id, "disconnected")
    const { roomId, userId } = socket
    if (!roomId || !userId) {
      return
    }

    const room = lounge.findRoomById(roomId)
    room.deleteUser(userId)

    gameIo.to(roomId).emit("roomUsers", room.getUserNames())

    if (room.isEmpty()) {
      lounge.deleteRoom(roomId)
    } else {
      gameIo.to(roomId).emit("disconnect", {
        listOfNames: room.getUserNames()
      })
    }
  }

  socket.on("signOut", signOut)
  socket.on("disconnect", signOut)
}
