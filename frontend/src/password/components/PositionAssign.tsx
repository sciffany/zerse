import React from "react"
import { PositionRecord } from "./PositionRecord"
import Stack, { HorizontalStack } from "common/components/Stack"
import Divider from "common/components/Divider"
import { Button } from "common/components/Styles"
import Centered from "common/components/Centered"

import passwordSelectors from "password/features/general/passwordSelector"
import { Spin } from "antd"
import { useSelector, useDispatch } from "react-redux"
import { useHistory, Redirect } from "react-router"
import {
  applyPositionService,
  startGameService
} from "password/features/positions/positionsService"
import routes from "routes"
import styled from "styled-components"
import { UserName } from "password/features/users/UserTypes"

const Text = styled.div``

const BoldText = styled.div`
  font-weight: bold;
`

const RightAlign = styled.div`
  display: flex;
`

export default function PositionAssign() {
  const userName = useSelector(passwordSelectors.userName)
  const roomName = useSelector(passwordSelectors.roomName)
  const socket = useSelector(passwordSelectors.socket)
  const dispatch = useDispatch()
  const history = useHistory()

  const applyPosition = React.useCallback(
    (key: number) => {
      applyPositionService({
        socket: socket!,
        dispatch,
        history,
        position: key
      })
    },
    [dispatch, history, socket]
  )

  const startGame = React.useCallback(() => {
    startGameService({ socket: socket!, dispatch, history })
  }, [dispatch, history, socket])

  const [roomUsers, setRoomUsers] = React.useState([] as UserName[])
  const [playButtonVisibility, setPlayButtonVisibility] = React.useState(false)
  const [roomPositions, setRoomPositions] = React.useState([] as UserName[])

  if (!socket) {
    return <Redirect to={routes.password.home} />
  }

  socket.on("readyPlay", () => {
    setPlayButtonVisibility(true)
  })

  socket.on("roomPositions", (roomPositions: UserName[]) => {
    setRoomPositions(roomPositions)
  })

  socket.on("roomUsers", (roomUsers: UserName[]) => {
    setRoomUsers(roomUsers)
  })

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
  )
}
