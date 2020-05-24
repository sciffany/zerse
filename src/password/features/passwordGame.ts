import Game from "common/features/game"
import Round from "./passwordRound"
import Room from "./passwordRoom"
import fetch from "node-fetch"
import { Word } from "password/passwordTypes"

const myApiKey = "ZMJN789H"
const numberOfWords = 16
const urlBase = `https://random-word-api.herokuapp.com`

export default class PasswordGame extends Game {
  public rounds: Round[]
  public words: Word[]

  constructor(room: Room) {
    super(room)
    this.init()
  }
  init() {
    this.generateWords()
  }

  async generateWords() {
    this.words = await fetch(
      `${urlBase}/word?key=${myApiKey}&number=${numberOfWords}`
    )
    return this.words
  }

  getNextWord() {
    var index = 0
    if (this.words[index]) {
      const word = this.words[index]
      index++
      return word
    } else {
      index = 0
      return [this.generateWords()]
    }
  }
}
