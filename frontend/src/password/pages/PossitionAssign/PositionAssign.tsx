import React from "react";
import { PositionRecord } from "./PlayerButton";
import Stack, { HorizontalStack } from "password/common/Stack";
import Divider from "password/common/Divider";
import { Button } from "password/common/Styles";
import Centered from "password/common/Centered";

import passwordSelectors from "password/features/general/passwordSelector";
import { Spin } from "antd";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router";
import routes from "routes";
import styled from "styled-components";
import { UserName } from "password/features/users/UserTypes";

const Text = styled.div``;

const BoldText = styled.div`
  font-weight: bold;
`;

const RightAlign = styled.div`
  display: flex;
`;

export default function PositionAssign() {
  const userName = useSelector(passwordSelectors.userName);
  const roomName = useSelector(passwordSelectors.roomName);
  const socket = useSelector(passwordSelectors.socket);

  const history = useHistory();
  const applyPosition = React.useCallback(
    (key: number) => {
      if (!socket) {
        return;
      }
      socket.emit("applyPosition", {
        position: key,
      });
    },
    [socket]
  );

  const startGame = React.useCallback(() => {
    if (!socket) {
      return;
    }
    socket.emit("startGameRequest");
  }, [socket]);

  const [roomUsers, setRoomUsers] = React.useState([] as UserName[]);
  const [playButtonVisibility, setPlayButtonVisibility] = React.useState(false);
  const [roomPositions, setRoomPositions] = React.useState([] as UserName[]);

  React.useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on("readyPlay", () => {
      setPlayButtonVisibility(true);
    });
    socket.on("roomUsers", (roomUsers: UserName[]) => {
      setRoomUsers(roomUsers);
    });
    socket.on("roomPositions", (roomPositions: UserName[]) => {
      setRoomPositions(roomPositions);
    });
    socket.on("startGameSuccess", () => {
      history.push(routes.password.playGame);
      socket.removeListener("startGameSuccess");
    });
    return () => {
      socket.removeListener("roomUsers");
      socket.removeListener("roomPositions");
      socket.removeListener("readyPlay");
      socket.removeListener("startGameSuccess");
    };
  }, [history, socket]);

  if (!socket) {
    return <Redirect to={routes.password.home} />;
  }

  return (
    <>
      <Stack spacing={12}>
        <RightAlign>
          Name: <b>{userName}</b>
        </RightAlign>
        <Divider />
        <Text>
          Room <b>{roomName}</b> successfully joined{" "}
        </Text>
        <Text>
          Players: <b>{roomUsers && roomUsers.join(", ")}</b>
        </Text>
        <Divider />
        <div>
          Waiting for other players to join <Spin />
        </div>
        <HorizontalStack spacing={50}>
          <Stack spacing={12}>
            <BoldText>Team 1 </BoldText>
            {[0, 1].map((number, index) => (
              <PositionRecord
                key={number.toString()}
                label={`Player ${index + 1}`}
                position={number}
                applyPosition={applyPosition}
                color={"royalblue"}
                userName={roomPositions && roomPositions[number]}
              />
            ))}
          </Stack>
          <Stack spacing={12}>
            <BoldText>Team 2 </BoldText>
            {[2, 3].map((number, index) => (
              <PositionRecord
                key={number.toString()}
                label={`Player ${index + 1}`}
                position={number}
                applyPosition={applyPosition}
                color={"red"}
                userName={roomPositions && roomPositions[number]}
              />
            ))}
          </Stack>
        </HorizontalStack>
        {playButtonVisibility && (
          <Centered>
            <Button color={"mediumseagreen"} onClick={startGame}>
              Play Now!
            </Button>
          </Centered>
        )}
      </Stack>
    </>
  );
}
