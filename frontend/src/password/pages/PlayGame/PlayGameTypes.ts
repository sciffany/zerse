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

export const initialState: PasswordGameState = {
  currentPlayers: {
    "0x1": {
      username: "Tiffany",
      positionNumber: 1,
      positionType: PositionType.HINTER,
      socketId: "0x1",
      teamNumber: 0,
    },
    "0x2": {
      username: "Jordan",
      positionNumber: 2,
      positionType: PositionType.GUESSER,
      socketId: "0x2",
      teamNumber: 0,
    },
    "0x3": {
      username: "Jinger",
      positionNumber: 3,
      positionType: PositionType.HINTER,
      socketId: "0x3",
      teamNumber: 1,
    },
    "0x4": {
      username: "Pamela",
      positionNumber: 4,
      positionType: PositionType.GUESSER,
      socketId: "0x4",
      teamNumber: 1,
    },
  },

  currentRound: 0,
  currentWord: "RAINBOW",
  currentPoints: 8,
  chatMessages: [
    {
      socketId: "0x1",
      text: "COLORFUL",
      type: PositionType.HINTER,
    },
    {
      socketId: "0x2",
      text: "CANDIES",
      type: PositionType.GUESSER,
    },
    {
      socketId: "0x3",
      text: "ARC",
      type: PositionType.HINTER,
    },
    {
      socketId: "0x4",
      text: "DISC",
      type: PositionType.GUESSER,
    },
  ],

  isWhoseTurn: "0x1",
  teams: [
    { players: ["0x1", "0x2"], score: 40 },
    { players: ["0x3", "0x4"], score: 54 },
  ],

  announcement: "Jordan guessed it! The word was 'lackadaisical'",
};
