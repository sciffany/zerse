import Lounge from "common/features/lounge"

export default function handleSignout(socket, gameIo, lounge: Lounge) {
  var signOut = () => {
    const { roomId, userId } = socket

    if (!roomId) {
      return
    }

    const room = lounge.findRoomById(roomId)
    room.deleteUser(userId)

    if (room.isEmpty) {
      lounge.deleteRoom(roomId)
    } else {
      gameIo.to(roomId).emit("disconnect", {
        listOfNames: room.getUserNames()
      })
    }
  }

  socket.on("disconnect", () => signOut())
  socket.on("signOut", () => signOut())
}
