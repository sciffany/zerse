import React from "react";
import styled from "styled-components";
import { Button } from "password/common/Styles";
import Stack from "password/common/Stack";
import Centered from "password/common/Centered";
import { useHistory } from "react-router";
import { Input } from "antd";

import { handleSignupService } from "password/features/signup/signupService";
import passwordSelectors from "password/features/general/passwordSelector";
import socketIOClient from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";

import { addSocket } from "password/features/general/passwordActions";
import config from "env";

const Title = styled.h1``;

const Text = styled.div``;

export default function Signup() {
  const [userName, setName] = React.useState("");
  const [roomName, setRoom] = React.useState("");

  const history = useHistory();
  const dispatch = useDispatch();
  const socket = useSelector(passwordSelectors.socket);

  const handleSignup = React.useCallback(() => {
    if (!socket) {
      return;
    }
    handleSignupService({ socket, history, userName, roomName, dispatch });
  }, [dispatch, history, roomName, socket, userName]);

  if (!socket) {
    const newSocket = socketIOClient.connect(`${config.serverUrl}/password`);
    dispatch(addSocket(newSocket));
  }

  if (!socket) {
    return <></>;
  }

  return (
    <>
      <Title>Password</Title>
      <Stack spacing={12}>
        <Text>Name</Text>

        <Input
          type="text"
          name="name"
          onChange={(event) => setName(event.target.value)}
        />
        <Text>Room</Text>
        <Input
          type="text"
          name="name"
          onChange={(event) => setRoom(event.target.value)}
        />
        <Centered>
          <Button onClick={handleSignup}>Join Room</Button>
        </Centered>
      </Stack>
    </>
  );
}
