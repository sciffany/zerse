import Room from "common/features/room";
import User from "common/features/user";
import { PasswordPlayer, Team } from "password/handlers/startGame";
import PasswordGame from "./passwordGame";

export default class PasswordRoom extends Room {
  protected capacity = 1;
  public game: PasswordGame;
  public teams: Team[] = [];

  getCurrentPlayers(): { [socketId: string]: PasswordPlayer } {
    const userToPlayerMap: [string, PasswordPlayer][] = this.users.map(
      (user: User) => {
        const userInformation: PasswordPlayer = {
          username: user.getName(),
          positionNumber: user.getPosition(),
          positionType: user.getPositionType(this.game.currentRound),
          socketId: user.socketId,
          teamNumber: user.getTeamNumber(),
        };
        return [user.socketId, userInformation];
      }
    );
    return Object.fromEntries(new Map(userToPlayerMap));
  }

  assignPosition(position: number, userId: number) {
    this.deleteUserFromPositions(userId);
    const user: User = this.findUserById(userId);
    this.positions[position] = user;
    const teamNumber = Math.floor(position / 2);
    this.teams[teamNumber] = { players: [], score: 0 };
    this.teams[teamNumber].players[position % 2] = user.socketId;
    user.changePosition(position);
  }
}
