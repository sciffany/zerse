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
  try {
    const room: Room =
      lounge.findRoomByName(roomName) || lounge.createRoom(roomName)

    const user = room.createUser(userName)

    socket.join(room.id)
    socket.emit("signUpSuccess")

    socket.roomId = room.id
    socket.userId = user.id

    gameIo.to(room.id).emit("roomUsers", room.getUserNames())
    socket.emit("roomPositions", room.getPositions())
  } catch (err) {
    socket.emit("errorMessage", err.message)
  }
}
