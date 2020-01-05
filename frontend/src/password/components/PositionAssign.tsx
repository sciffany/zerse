import React from "react"
import { PositionRecord } from "./PositionRecord"
import Stack from "common/components/Stack"
import passwordSelectors from "password/features/general/passwordSelector"

export default function PositionAssign() {
  return (
    <>
      <Stack spacing={12}>
        <div>Room {passwordSelectors.roomName} successfully joined</div>
        Watchers: {passwordSelectors.roomUsers}
        <div>Waiting for other players to join...</div>
        <PositionRecord label="Player 1" key="1" />
        <PositionRecord label="Player 2" key="2" />
        <PositionRecord label="Player 1" key="3" />
        <PositionRecord label="Player 2" key="4" />
      </Stack>
    </>
  )
}
