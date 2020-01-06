import React from "react"
import styled from "styled-components"
import { Button } from "common/components/Styles"
import Stack from "common/components/Stack"
import Centered from "common/components/Centered"
import { useHistory } from "react-router"
import { Input } from "antd"

import { useDispatch } from "react-redux"
import { handleSignupService } from "password/features/signup/signupService"

const Title = styled.h1``

const Text = styled.div``

interface Props {
  socket: SocketIOClient.Socket
}

export default function Signup({ socket }: Props) {
  const [userName, setName] = React.useState("")
  const [roomName, setRoom] = React.useState("")

  const history = useHistory()
  const dispatch = useDispatch()

  const handleSignup = React.useCallback(
    () =>
      handleSignupService({ socket, history, userName, roomName, dispatch }),
    [dispatch, history, roomName, socket, userName]
  )

  return (
    <>
      <Title>Password</Title>
      <Stack spacing={12}>
        <Text>Name</Text>

        <Input
          type="text"
          name="name"
          onChange={event => setName(event.target.value)}
        />
        <Text>Room</Text>
        <Input
          type="text"
          name="name"
          onChange={event => setRoom(event.target.value)}
        />
        <Centered>
          <Button onClick={handleSignup}>Join Room</Button>
        </Centered>
      </Stack>
    </>
  )
}
