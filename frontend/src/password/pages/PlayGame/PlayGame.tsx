import React from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router";
import { Input } from "antd";
import styled from "styled-components";
import Stack, { HorizontalStack } from "password/common/Stack";
import passwordSelectors from "password/features/general/passwordSelector";
import routes from "routes";
import Divider from "password/common/Divider";
import { PositionRecord } from "../PossitionAssign/PlayerButton";
import { Button } from "password/common/Styles";
import MessageBoxPlain from "./MessageBoxPlain";
import {
  initialState,
  PasswordGameState,
  PositionType,
  Team,
} from "./PlayGameTypes";
import { Alert } from "antd";
import _ from "lodash";

const correctSound = require("./correct.mp3");
const wrongSound = require("./wrong.mp3");

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

export default function PlayGame() {
  const socket = useSelector(passwordSelectors.socket);
  const [timer, setTimer] = React.useState<number>(60);
  const [passwordGameState, setPasswordGameState] =
    React.useState<PasswordGameState>(initialState);
  const currentPlayer = passwordGameState.currentPlayers[socket?.id || ""];
  const [currentText, setCurrentText] = React.useState<string>("");
  const history = useHistory();

  React.useEffect(() => {
    socket?.on("gameState", (passwordGameState: PasswordGameState) => {
      console.log(passwordGameState);
      if (!_.isEmpty(passwordGameState.announcement)) {
        const correctAudio = new Audio(correctSound);
        correctAudio.play();
      } else if (
        passwordGameState.chatMessages.length > 1 &&
        passwordGameState.chatMessages.length % 2 === 0
      ) {
        const wrongAudio = new Audio(wrongSound);
        wrongAudio.play();
      }
      setPasswordGameState(passwordGameState);
    });
    socket?.on("timer", (timer: number) => {
      setTimer(timer);
    });
    socket?.on("roomPositions", () => {
      history.push(routes.password.positionAssign, { continueGame: true });
    });
    return () => {
      socket?.removeListener("roomPositions");
      socket?.removeListener("timer");
      socket?.removeListener("gameState");
    };
  }, [socket, history]);

  React.useEffect(() => {
    const pingServer = setInterval(() => {
      socket?.emit("/password/ping");
    }, 5000);
    return () => {
      clearInterval(pingServer);
    };
  }, [socket]);

  if (!socket) {
    return <Redirect to={routes.password.home} />;
  }

  function onSend() {
    socket?.emit("passwordAttempt", {
      passwordAttempt: currentText,
    });
    setCurrentText("");
  }
  if (!currentPlayer) {
    return <></>;
  }
  return (
    <>
      {passwordGameState.announcement && (
        <Alert
          message={passwordGameState.announcement}
          type="success"
          closable
        />
      )}
      <Stack spacing={10}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            Word:{" "}
            {currentPlayer.positionType === PositionType.HINTER ? (
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
            Your{" "}
            {currentPlayer.positionType === PositionType.GUESSER
              ? "guess"
              : "hint"}
            :
            <Input
              style={{ width: 200 }}
              value={currentText}
              onChange={(e) => setCurrentText(e.target.value)}
            ></Input>
            <Button width={100} height={30} onClick={onSend}>
              Send
            </Button>
          </PlainHorizontalStack>
        )}
        <Divider></Divider>

        <MessageBoxPlain
          passwordGameState={passwordGameState}
        ></MessageBoxPlain>
        <Text>
          {
            passwordGameState.currentPlayers[passwordGameState.isWhoseTurn]
              .username
          }{" "}
          {passwordGameState.currentPlayers[passwordGameState.isWhoseTurn]
            .positionType === PositionType.HINTER
            ? "is thinking of a hint "
            : "is trying to guess the word "}
          for {passwordGameState.currentPoints} points...
        </Text>
        <Divider></Divider>

        <HorizontalStack spacing={40}>
          {passwordGameState.teams.map((team: Team, teamNumber: number) => {
            return (
              <Stack key={Math.random()} spacing={12}>
                <BoldText>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>Team {["A", "B"][teamNumber]}</div>
                    <div>{team.score} pts</div>
                  </div>
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
