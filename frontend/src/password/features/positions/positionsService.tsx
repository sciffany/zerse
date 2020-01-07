import { createError } from "../general/passwordActions"
import { ServiceArgs } from "../general/passwordTypes"

type ApplyPositionArgs = ServiceArgs & {
  position: number
}

type StartGameArgs = ServiceArgs

export function applyPositionService({
  socket,
  history,
  dispatch,
  position
}: ApplyPositionArgs) {
  socket.emit("applyPosition", {
    position
  })

  socket.on("errorMessage", (error: string) => {
    dispatch(createError(error))
  })
}

export function startGameService({ socket, history, dispatch }: StartGameArgs) {
  socket.emit("startGame")

  socket.on("errorMessage", (error: string) => {
    dispatch(createError(error))
  })
}
