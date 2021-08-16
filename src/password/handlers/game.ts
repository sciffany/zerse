import Lounge from "common/features/lounge";
import PasswordGame from "password/features/passwordGame";
import { PasswordSocket } from "password/passwordTypes";
import { PasswordGameState, PositionType } from "./startGame";

export default function handlePasswordAttempt(socket, gameIo, lounge: Lounge) {
  socket.on("passwordAttempt", handler(socket, gameIo, lounge));
}

const handler =
  (socket: PasswordSocket, gameIo, _: Lounge) =>
  async ({ passwordAttempt }: { passwordAttempt: string }) => {
    const { user, room } = socket;
    try {
      console.log("password attempt", passwordAttempt);

      const game = room.game;
      const type: PositionType =
        room.getCurrentPlayers()[socket.id].positionType;

      if (
        type === PositionType.GUESSER &&
        game.currentWord === passwordAttempt
      ) {
        // If win
        await game.advanceToNextRound(
          room.getCurrentPlayers()[socket.id].teamNumber
        );
      } else {
        // If not
        game.advanceToNextPlayer();
        game.chatMessages.push({
          socketId: socket.id,
          text: passwordAttempt,
          type,
        });
        if (type === PositionType.GUESSER) {
          game.currentPoints--;
        }
      }

      const gameState: PasswordGameState = {
        currentPlayers: room.getCurrentPlayers(),
        currentRound: game.currentRound,
        currentWord: game.currentWord,
        currentPoints: game.currentPoints,
        chatMessages: game.chatMessages,
        isWhoseTurn: room.game.whoseTurn,
        teams: room.game.getTeams(),
      };

      gameIo.to(room.id).emit("gameState", gameState);
    } catch (err) {
      socket.emit("errorMessage", err.message);
    }
  };
