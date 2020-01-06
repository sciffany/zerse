import { UserName } from "../users/UserTypes"
import { RoomName, setRoomUsers, setUserAndRoom } from "./signupActions"
import { createError } from "../general/passwordActions"
import routes from "routes"
import { setRoomPositions } from "../positions/positionsActions"

type HandleSignupArgs = {
  socket: SocketIOClient.Socket
  history: any
  userName: UserName
  roomName: RoomName
  dispatch: any
}

export function handleSignupService({
  socket,
  history,
  userName,
  roomName,
  dispatch
}: HandleSignupArgs) {
  socket.emit("signUp", {
    roomName,
    userName
  })
  socket.on("signUpSuccess", () => {
    dispatch(setUserAndRoom(userName, roomName))
    history.push(routes.password.positionAssign)
  })

  socket.on("errorMessage", (error: string) => {
    dispatch(createError(error))
  })

  socket.on("roomUsers", (roomUsers: UserName[]) =>
    dispatch(setRoomUsers(roomUsers))
  )
  socket.on("roomPositions", (roomPositions: UserName[]) =>
    dispatch(setRoomPositions(roomPositions))
  )
}
