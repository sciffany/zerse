import Lounge from "common/features/lounge";
import PasswordGame from "../features/passwordGameClass";
import { PasswordSocket } from "password/passwordTypes";
import { PasswordGameState } from "./startGame";

export default function handleContinueGame(socket, gameIo, lounge: Lounge) {
  socket.on("continueGameRequest", handler(socket, gameIo, lounge));
}

const handler = (socket: PasswordSocket, gameIo, _: Lounge) => async () => {
  const { user, room } = socket;
  try {
    console.log("continue game requested for password");
    gameIo.to(room.roomname).emit("startGameSuccess");

    const gameState: PasswordGameState = {
      currentPlayers: room.getCurrentPlayers(),
      currentRound: room.game.currentRound,
      currentWord: room.game.getWord(),
      currentPoints: room.game.currentPoints,
      chatMessages: room.game.chatMessages,
      isWhoseTurn: room.game.whoseTurn,
      teams: room.game.getTeams(),
      announcement: "",
    };

    gameIo.to(room.roomname).emit("gameState", gameState);
  } catch (err) {
    socket.emit("errorMessage", err.message);
  }
};
