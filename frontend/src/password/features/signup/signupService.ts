import { UserName } from "../users/UserTypes"
import { RoomName, setUserAndRoom } from "./signupActions"
import { createError } from "../general/passwordActions"
import routes from "routes"

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
    socket.removeListener("signUpSucess")
  })
  socket.on("errorMessage", (error: string) => {
    dispatch(createError(error))
  })
}
