import React from "react"
import { PositionRecord } from "./PositionRecord"
import Stack, { HorizontalStack } from "common/components/Stack"
import Divider from "common/components/Divider"

import passwordSelectors from "password/features/general/passwordSelector"
import { Spin } from "antd"
import { useSelector, useDispatch } from "react-redux"
import { useHistory, Redirect } from "react-router"
import { applyPositionService } from "password/features/positions/positionsService"
import routes from "routes"
import styled from "styled-components"

export default function PositionAssign() {
  const userName = useSelector(passwordSelectors.userName)
  const roomName = useSelector(passwordSelectors.roomName)
  const roomUsers = useSelector(passwordSelectors.roomUsers)
  const roomPositions = useSelector(passwordSelectors.roomPositions)
  const socket = useSelector(passwordSelectors.socket)
  const dispatch = useDispatch()
  const history = useHistory()

  const applyPosition = React.useCallback(
    (key: number) => {
      if (!socket) {
        return
      }
      applyPositionService({ socket, dispatch, history, position: key })
    },
    [dispatch, history, socket]
  )

  if (!socket) {
    return <Redirect to={routes.password.home} />
  }

  const BoldText = styled.div`
    font-weight: bold;
  `

  const RightAlign = styled.div`
    display: flex;
  `

  return (
    <>
      <Stack spacing={12}>
        <RightAlign>
          Name: <b>{userName}</b>
        </RightAlign>
        <Divider />
        <div>
          Room <b>{roomName}</b> successfully joined
        </div>
        Players: <b>{roomUsers && roomUsers.join(", ")}</b>
        <Divider />
        <div>
          Waiting for other players to join <Spin />
        </div>
        <HorizontalStack spacing={50}>
          <Stack spacing={12}>
            <BoldText>Team 1 </BoldText>
            {[0, 1].map((number, index) => (
              <PositionRecord
                label={`Player ${index + 1}`}
                position={number}
                applyPosition={applyPosition}
                userName={roomPositions && roomPositions[number]}
              />
            ))}
          </Stack>
          <Stack spacing={12}>
            <BoldText>Team 2 </BoldText>
            {[2, 3].map((number, index) => (
              <PositionRecord
                label={`Player ${index + 1}`}
                position={number}
                applyPosition={applyPosition}
                userName={roomPositions && roomPositions[number]}
              />
            ))}
          </Stack>
        </HorizontalStack>
      </Stack>
    </>
  )
}
