import Room from "common/features/room";
import User from "common/features/user";
import { PasswordPlayer, Team } from "password/handlers/startGame";
import PasswordGame from "./passwordGameClass";

export default class PasswordRoom extends Room {
  protected capacity = 2;
  public game: PasswordGame;
  public teams: Team[] = [];

  getCurrentPlayers(): { [socketId: string]: PasswordPlayer } {
    const userToPlayerMap: [string, PasswordPlayer][] = [
      ...this.userMap.entries(),
    ].map(([socketId, user]: [string, User]) => {
      const userInformation: PasswordPlayer = {
        username: user.getName(),
        positionNumber: user.getPosition(),
        positionType: user.getPositionType(this.game.currentRound),
        socketId,
        teamNumber: user.getTeamNumber(),
      };
      return [socketId, userInformation];
    });
    return Object.fromEntries(new Map(userToPlayerMap));
  }

  assignPosition(position: number, user: User) {
    this.deleteUserFromPosition(user);
    this.positions[position] = user;
    const teamNumber = Math.floor(position / 2);
    if (!this.teams[teamNumber])
      this.teams[teamNumber] = { players: [], score: 0 };
    this.teams[teamNumber].players[position % 2] = user.socketId;
    user.changePosition(position);
  }

  reversePositions() {
    const reversePositions = this.positions.map((_, index) => {
      if (index % 2 === 0) {
        return this.positions[index + 1];
      } else {
        return this.positions[index - 1];
      }
    });
    this.positions = reversePositions;
  }

  deleteUser(socketId: string): void {
    this.userMap.delete(socketId);

    const positionIndex = this.positions.findIndex(
      (user: User) => user && user.socketId === socketId
    );
    if (positionIndex === undefined) {
      throw new Error("Cannot find user to delete.");
    }
    this.positions[positionIndex] = undefined;
  }
}
