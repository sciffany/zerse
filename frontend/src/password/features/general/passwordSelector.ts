import { StateType } from "typesafe-actions"
import rootReducer from "password/infrastructure/rootReducer"
import { PasswordState } from "./passwordTypes"

type RootState = StateType<typeof rootReducer>

const $ = <T,>(selector: (s: PasswordState) => T) => (state: RootState) =>
  selector(state.password)

const error$ = $(s => s.error)
const userName$ = $(s => s.userName)
const roomName$ = $(s => s.roomName)
const roomUsers$ = $(s => s.roomUsers)
const roomPositions$ = $(s => s.roomPositions)
const socket$ = $(s => s.socket)

const passwordSelectors = {
  error: error$,
  userName: userName$,
  roomName: roomName$,
  roomUsers: roomUsers$,
  roomPositions: roomPositions$,
  socket: socket$
}

export default passwordSelectors
