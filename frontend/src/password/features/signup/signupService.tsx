import { UserName } from "../users/UserTypes"
import { RoomName, setRoomName } from "./signupActions"
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
    dispatch(setRoomName(roomName))
    history.push(routes.password.positionAssign)
  })

  socket.on("errorMessage", (error: string) => {
    dispatch(createError(error))
  })
  socket.on("personJoined", console.log)

  //   socket.on("person order", (details: PlayerDetail) => {
  //     this.setState(prevState => ({
  //       playerOrder: { ...prevState.playerOrder, [details.code]: details.name }
  //     }))
  //     console.log(this.state.playerOrder)
  //   })
}
