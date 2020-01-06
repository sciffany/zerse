import React from "react"
import { Button } from "common/components/Styles"
import { PositionNumber } from "password/features/positions/positionsTypes"
import { UserName } from "password/features/users/UserTypes"

export interface Props {
  label: string
  position: PositionNumber
  applyPosition: (key: number) => any
  userName: UserName | null
}

export interface SignupState {}

export function PositionRecord({
  label,
  position,
  applyPosition,
  userName
}: Props) {
  const onClick = () => {
    applyPosition(position)
  }
  return (
    <div margin-top="10px">
      <Button onClick={onClick} disabled={!!userName} height={40}>
        {" "}
        {userName || label}{" "}
      </Button>
    </div>
  )
}
