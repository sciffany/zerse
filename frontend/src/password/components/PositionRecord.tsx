import React from "react"
import { Button } from "common/components/Styles"

export interface Props {
  label: string
  key: string
}

export interface SignupState {}

export function PositionRecord({ label, key }: Props) {
  const [assigned, setAssigned] = React.useState(false)

  const onClick = React.useCallback(() => 0, [])
  return (
    <div margin-top="10px">
      <Button onClick={onClick} disabled={assigned}>
        {" "}
        {label}{" "}
      </Button>
    </div>
  )
}
