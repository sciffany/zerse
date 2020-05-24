import Game from "common/features/game"
import { Word } from "password/passwordTypes"

export default class PasswordRound {
  public game: Game[]
  public words: Word[]

  constructor() {
    this.init()
  }
  async init() {}
}
