import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Input } from "antd";
import styled from "styled-components";

import Stack, { HorizontalStack } from "password/common/Stack";
import passwordSelectors from "password/features/general/passwordSelector";
import routes from "routes";
import Divider from "password/common/Divider";
import { PositionRecord } from "../PossitionAssign/PlayerButton";
import { Button } from "password/common/Styles";
import MessageBoxPlain from "./MessageBoxPlain";

const Text = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
`;

const BoldText = styled.div`
  font-weight: bold;
`;

const PlainHorizontalStack = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const teamColors = ["royalblue", "red"];

export enum PositionType {
  HINTER,
  GUESSER,
}

type PasswordPlayer = {
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

  isWhoseTurn: string;
  teams: Team[];
};

export type ChatMessage = {
  socketId: string;
  text: string;
  type: PositionType;
};

type Team = {
  players: string[];
  score: number;
};

const initialState: PasswordGameState = {
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
      socketId: "0x1",
      text: "ARC",
      type: PositionType.HINTER,
    },
  ],

  isWhoseTurn: "0x1",
  teams: [
    { players: ["0x1", "0x2"], score: 40 },
    { players: ["0x3", "0x4"], score: 54 },
  ],
};

export default function PlayGame() {
  const socket = useSelector(passwordSelectors.socket);
  const [timer, setTimer] = React.useState<number>(60);
  const [passwordGameState, setPasswordGameState] =
    React.useState<PasswordGameState>(initialState);
  const currentPlayer = passwordGameState.currentPlayers["0x1"];

  React.useEffect(() => {
    socket?.on("gameState", (passwordGameState: PasswordGameState) => {
      setPasswordGameState(passwordGameState);
    });
    socket?.on("timer", (timer: number) => {
      setTimer(timer);
    });
  }, [passwordGameState, setPasswordGameState, socket]);

  if (!socket) {
    return <Redirect to={routes.password.home} />;
  }
  return (
    <>
      <Stack spacing={10}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            Word:{" "}
            {passwordGameState.currentPlayers ? (
              <b>{passwordGameState.currentWord}</b>
            ) : (
              <b>???</b>
            )}
          </div>
          <div> Timer: {timer}</div>
        </div>
        <Divider></Divider>
        {currentPlayer.socketId === passwordGameState.isWhoseTurn && (
          <PlainHorizontalStack>
            Your hint:
            <Input style={{ width: 200 }}></Input>
            <Button width={100} height={30}>
              Send
            </Button>
          </PlainHorizontalStack>
        )}
        <Text>
          {
            passwordGameState.currentPlayers[passwordGameState.isWhoseTurn]
              .username
          }{" "}
          {passwordGameState.currentPlayers[passwordGameState.isWhoseTurn]
            .positionType === PositionType.HINTER
            ? "is thinking of a word..."
            : "is trying to guess the word..."}
        </Text>
        <MessageBoxPlain
          passwordGameState={passwordGameState}
        ></MessageBoxPlain>
        <Divider></Divider>

        <HorizontalStack spacing={40}>
          {passwordGameState.teams.map((team: Team, teamNumber: number) => {
            return (
              <Stack key={Math.random()} spacing={12}>
                <BoldText>
                  Team {teamNumber + 1}: {team.score}
                </BoldText>
                {team.players.map((playerId: string, playerNumber: number) => {
                  const player = passwordGameState.currentPlayers[playerId];
                  return (
                    <PositionRecord
                      key={playerId}
                      label={`${player.username} (${
                        player.positionType === PositionType.GUESSER
                          ? "guesser"
                          : "hinter"
                      })`}
                      position={playerNumber}
                      color={teamColors[teamNumber]}
                      applyPosition={() => {}}
                      userName={player.username}
                    />
                  );
                })}
              </Stack>
            );
          })}
        </HorizontalStack>
      </Stack>
    </>
  );
}
