import Game from "common/features/game";
import Room from "./passwordRoom";
import fetch from "node-fetch";
import { Word } from "password/passwordTypes";
import { ChatMessage, Team } from "password/handlers/startGame";
import PasswordRoom from "./passwordRoom";
import axios from "axios";

const myApiKey = "ZMJN789H";
const numberOfWords = 16;
const urlBase = `https://random-word-api.herokuapp.com`;

export default class PasswordGame extends Game {
  public currentRound: number;
  public currentWord: string;
  public currentPoints: number = 10;
  public whoseTurn: string;
  public scores: number[] = [0, 0];
  public room: PasswordRoom;
  public chatMessages: ChatMessage[] = [];

  constructor(room: PasswordRoom) {
    super();
    this.room = room;
    room.game = this;
    this.init();
  }

  init() {
    this.generateWords();
    this.currentRound = 0;
  }

  async generateWords() {
    const result = await axios.get(`${urlBase}/word?number=${numberOfWords}`);
    return result;
  }

  async getNextWord() {
    const newWords = await this.generateWords();
    this.currentWord = newWords.data[0];
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
    console.log(this.currentWord);
  }

  getTeams(): Team[] {
    return this.room.teams.map((team, teamIndex) => {
      team.score = this.scores[teamIndex];
      return team;
    });
  }
}
