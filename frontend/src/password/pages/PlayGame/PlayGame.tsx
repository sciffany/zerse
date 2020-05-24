import React from "react"
import { useSelector } from "react-redux"
import { Redirect } from "react-router"
import { Input } from "antd"
import styled from "styled-components"

import Stack, { HorizontalStack } from "password/common/Stack"
import passwordSelectors from "password/features/general/passwordSelector"
import routes from "routes"
import Divider from "password/common/Divider"
import { PositionRecord } from "../PossitionAssign/PlayerButton"
import { UserName } from "password/features/users/UserTypes"
import { Button } from "password/common/Styles"
import MessageBoxPlain from "./MessageBoxPlain"

const Text = styled.div`
  font-size: 20px;

  margin-bottom: 20px;
`

const BoldText = styled.div`
  font-weight: bold;
`

const PlainHorizontalStack = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export default function PlayGame() {
  const socket = useSelector(passwordSelectors.socket)
  const [roomPositions, setRoomPositions] = React.useState([] as UserName[])

  React.useEffect(() => {
    if (!socket) {
      return
    }
    socket.on("roomPositions", (roomPositions: UserName[]) => {
      setRoomPositions(roomPositions)
    })
  }, [socket])

  const [count, setCount] = React.useState(60)

  React.useEffect(() => {
    const id = setInterval(() => {
      setCount(count - 1)
    }, 1000)
    return () => {
      clearInterval(id)
    }
  }, [count])

  React.useEffect(() => {}, [socket])

  if (!socket) {
    return <Redirect to={routes.password.home} />
  }
  return (
    <>
      <Stack spacing={10}>
        <div>
          Word: <b>RAINBOW</b>
        </div>
        <Divider></Divider>
        <PlainHorizontalStack>
          Your hint:
          <Input style={{ width: 200 }}></Input>
          <Button width={100} height={30}>
            Send
          </Button>
        </PlainHorizontalStack>
        <Text>Tiffany is thinking of a word...</Text>
        <MessageBoxPlain></MessageBoxPlain>
        <HorizontalStack spacing={40}>
          <Stack spacing={12}>
            <BoldText>Team 1: 40 </BoldText>
            {[0, 1].map((number, index) => (
              <PositionRecord
                key={number.toString()}
                label={`Tiffany (guesser)`}
                position={number}
                color={"royalblue"}
                applyPosition={() => {}}
                userName={roomPositions && roomPositions[number]}
              />
            ))}
          </Stack>
          <Stack spacing={12}>
            <BoldText>Team 2: 69 </BoldText>
            {[2, 3].map((number, index) => (
              <PositionRecord
                key={number.toString()}
                label={`Jinger (guesser)`}
                position={number}
                applyPosition={() => {}}
                color={"red"}
                userName={roomPositions && roomPositions[number]}
              />
            ))}
          </Stack>
        </HorizontalStack>
      </Stack>
    </>
  )
}
