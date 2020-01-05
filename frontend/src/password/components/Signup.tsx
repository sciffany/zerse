import React from "react"
import styled from "styled-components"
import { Button } from "common/components/Styles"
import Stack from "common/components/Stack"
import Centered from "common/components/Centered"
import { useHistory } from "react-router"

import { useDispatch } from "react-redux"
import handleSignup from "password/features/signup/signupService"

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
  return (
    <>
      <Title>Password</Title>
      <Stack spacing={12}>
        <Text>Name</Text>
        <input
          type="text"
          name="name"
          onChange={event => setName(event.target.value)}
        />
        <Text>Room</Text>
        <input
          type="text"
          name="name"
          onChange={event => setRoom(event.target.value)}
        />
        <Centered>
          <Button
            onClick={() =>
              handleSignup({ socket, history, userName, roomName, dispatch })
            }
          >
            Join Room
          </Button>
        </Centered>
      </Stack>
    </>
  )
}
