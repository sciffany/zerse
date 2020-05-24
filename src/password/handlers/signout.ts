import Lounge from "common/features/lounge"
import { PasswordSocket } from "password/passwordTypes"

export default function handleSignout(
  socket: PasswordSocket,
  gameIo,
  lounge: Lounge
) {
  const signOut = () => {
    const { room, user } = socket
    console.log("User disconnected")
    if (!room || !user) {
      return
    }
    room.deleteUser(user.id)

    gameIo.to(room.id).emit("roomUsers", room.getUserNames())

    if (room.isEmpty()) {
      lounge.deleteRoom(room.id)
    } else {
      gameIo.to(room.id).emit("disconnect", {
        listOfNames: room.getUserNames(),
      })
    }
  }

  socket.on("signOut", signOut)
  socket.on("disconnect", signOut)
}
