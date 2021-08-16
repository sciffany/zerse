import Lounge from "common/features/lounge";
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

      let announcement = "";
      if (
        type === PositionType.GUESSER &&
        game.currentWord === passwordAttempt
      ) {
        announcement = `${
          room.getCurrentPlayers()[socket.id].username
        } has guessed the word. The word was '${game.currentWord}'`;
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
          // lose
          if (game.currentPoints === 0) {
            await game.advanceToNextRound(
              room.getCurrentPlayers()[socket.id].teamNumber
            );
          }
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
        announcement,
      };

      gameIo.to(room.id).emit("gameState", gameState);
    } catch (err) {
      socket.emit("errorMessage", err.message);
    }
  };
