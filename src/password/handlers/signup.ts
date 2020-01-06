import { UserName } from "common/features/user"
import Room, { RoomName } from "common/features/room"
import Lounge from "common/features/lounge"

type SignupDetails = {
  userName: UserName
  roomName: RoomName
}

export default function handleSignup(socket, gameIo, lounge: Lounge) {
  socket.on("signUp", handler(socket, gameIo, lounge))
}

const handler = (socket, gameIo, lounge: Lounge) => ({
  userName,
  roomName
}: SignupDetails) => {
  const room: Room =
    lounge.findRoomByName(roomName) || lounge.createRoom(roomName)

  try {
    const user = room.createUser(userName)

    socket.join(room.id)
    socket.emit("signUpSuccess")

    gameIo.to(room.id).emit("userJoined", {
      listOfNames: room.getUserNames()
    })

    socket.userId = user.id
    socket.roomId = room.id
  } catch (err) {
    socket.emit("errorMessage", err.message)
    return {}
  } finally {
  }
}
