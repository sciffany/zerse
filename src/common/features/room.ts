import User from "./user";
import { PositionNumber } from "./position";
export default abstract class Room {
  public roomname: string;
  public userMap: Map<string, User>;
  protected positions: User[];
  protected abstract capacity: number;

  constructor(roomname: string) {
    this.roomname = roomname;
    this.userMap = new Map<string, User>();
    this.positions = [];
  }

  createUser(username: string, socketId: string): User {
    if (this.findUserByName(username)) {
      throw new Error("User already exists");
    }
    const newUser = new User(username, socketId, this);
    this.userMap.set(socketId, newUser);
    return newUser;
  }

  findUserByName(username: string): User {
    if (!username) {
      throw new Error("User name cannot be empty.");
    }
    return [...this.userMap.values()].find(
      (user: User) => user.getName() === username
    );
  }

  findUserById(socketId: string) {
    return this.userMap[socketId];
  }

  getUserNames(): string[] {
    return [...this.userMap.values()].map((user: User) => user.getName());
  }

  abstract deleteUser(socketId: string): void;

  isEmpty(): boolean {
    return !this.userMap.size;
  }

  isPositionEmpty(position: PositionNumber): boolean {
    return !this.positions[position];
  }

  deleteUserFromPosition(userToBeDeleted: User) {
    this.positions.filter((user) => user !== userToBeDeleted);
  }

  getUsernamesByPosition(): string[] {
    return this.positions.map((user: User) => user?.getName());
  }

  getLeader(): User {
    return [...this.userMap.values()][0];
  }

  arePositionsFilled(): boolean {
    return this.positions.filter((user) => !!user).length >= this.capacity;
  }

  getPositions(): User[] {
    return this.positions;
  }
}
