import { StateType } from "typesafe-actions"
import rootReducer from "infrastructure/rootReducer"
import { PasswordState } from "./passwordTypes"

type RootState = StateType<typeof rootReducer>

const $ = <T,>(selector: (s: PasswordState) => T) => (state: RootState) =>
  selector(state.password)

const error$ = $(s => s.error)
const roomName$ = $(s => s.roomName)
const roomUsers$ = $(s => s.roomUsers)

const passwordSelectors = {
  error: error$,
  roomName: roomName$,
  roomUsers: roomUsers$
}

export default passwordSelectors
