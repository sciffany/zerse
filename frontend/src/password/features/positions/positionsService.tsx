import { UserName } from "../users/UserTypes"
import { createError } from "../general/passwordActions"
import { ServiceArgs } from "../general/passwordTypes"
import { setRoomPositions } from "./positionsActions"

type ApplyPositionArgs = ServiceArgs & {
  position: number
}

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
