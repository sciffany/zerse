import Game from "common/features/game";
import { ChatMessage, Team } from "password/handlers/startGame";
import PasswordRoom from "./passwordRoom";
import * as fs from "fs";
import * as util from "util";

const readFile = util.promisify(fs.readFile);
export default class PasswordGame extends Game {
  public currentRound: number = 0;
  public currentWord: string;
  public currentPoints: number = 10;
  public whoseTurn: string;
  public scores: number[] = [0, 0];
  public room: PasswordRoom;
  public chatMessages: ChatMessage[] = [];
  public words: string[] = [];

  constructor(room: PasswordRoom) {
    super();
    this.room = room;
    room.game = this;
  }

  async init() {
    await this.generateWords();
  }

  async generateWords() {
    const data = await readFile(__dirname + "/wordlist.txt", "utf8");
    let words = [];
    data.split("\n").filter((line) => {
      const [content, freq] = line.split(" ");
      const len = content.length;
      if (freq > 1.7 && freq > 5 && len < 9) {
        words.push(content);
      }
    });
    this.words = this.shuffle(words).slice(0, 100);
  }

  async getNextWord() {
    this.currentWord = this.words[this.currentRound];
  }

  getWord() {
    return this.currentWord;
  }

  setFirstPlayerInRound() {
    this.whoseTurn = this.room.getPositions()[this.currentRound % 4].socketId;
  }

  advanceToNextPlayer() {
    const currentPlayerIndex = this.room
      .getPositions()
      .findIndex((user) => user.socketId === this.whoseTurn);
    this.whoseTurn =
      this.room.getPositions()[(currentPlayerIndex + 1) % 4].socketId;
  }

  async advanceToNextRound(teamNumber: number) {
    this.currentRound++;
    await this.getNextWord();
    this.chatMessages = [];
    this.scores[teamNumber] += this.currentPoints;
    this.currentPoints = 10;
    this.room.reversePositions();
    const whoseTeamTurn = Math.floor(this.currentRound / 2) % 2;
    this.whoseTurn = this.room.getPositions()[whoseTeamTurn * 2].socketId;
  }

  getTeams(): Team[] {
    return this.room.teams.map((team, teamIndex) => {
      team.score = this.scores[teamIndex];
      return team;
    });
  }

  //Fisher-Yates (aka Knuth) Shuffle
  shuffle(array: Array<any>) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}
