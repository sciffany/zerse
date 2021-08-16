import Lounge from "common/features/lounge";
import PasswordGame from "password/features/passwordGame";
import { PasswordSocket } from "password/passwordTypes";

export default function handlePlayGame(socket, gameIo, lounge: Lounge) {
  socket.on("startGameRequest", handler(socket, gameIo, lounge));
}

export enum PositionType {
  HINTER,
  GUESSER,
}

export type PasswordPlayer = {
  username: string;
  positionNumber: number;
  positionType: PositionType;
  socketId: string;
  teamNumber: number;
};

export type PasswordGameState = {
  currentPlayers: { [socketId: string]: PasswordPlayer };

  currentRound: number;
  currentWord: string;
  chatMessages: ChatMessage[];
  currentPoints: number;

  isWhoseTurn: string;
  teams: Team[];

  announcement: string;
};

export type ChatMessage = {
  socketId: string;
  text: string;
  type: PositionType;
};

export type Team = {
  players: string[];
  score: number;
};

const handler = (socket: PasswordSocket, gameIo, _: Lounge) => async () => {
  const { user, room } = socket;
  try {
    console.log("start game requested for password");
    gameIo.to(room.id).emit("startGameSuccess");

    const game = new PasswordGame(room);

    await game.getNextWord();
    game.whoseTurn = room.getPositions()[0].socketId;

    const gameState: PasswordGameState = {
      currentPlayers: room.getCurrentPlayers(),
      currentRound: 0,
      currentWord: game.getWord(),
      currentPoints: game.currentPoints,
      chatMessages: [],
      isWhoseTurn: room.game.whoseTurn,
      teams: room.game.getTeams(),
      announcement: "",
    };

    gameIo.to(room.id).emit("gameState", gameState);
  } catch (err) {
    socket.emit("errorMessage", err.message);
  }
};
