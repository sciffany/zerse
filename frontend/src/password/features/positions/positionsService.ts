import { ServiceArgs } from "../general/passwordTypes"
import routes from "routes"

type StartGameArgs = ServiceArgs

export function startGameService({ socket, history, dispatch }: StartGameArgs) {
  socket.emit("startGame")

  socket.on("startGameSuccess", () => {
    history.push(routes.password.playGame)
    socket.removeListener("startGameSuccess")
  })
}
