import React from "react"
import Button from "react-bootstrap/Button"

export interface Props {
  label: string
  key: string
}

export interface SignupState {}

export function PositionRecord({ label, key }: Props) {
  // const handleClick = (e: any) => handleSignup(code)
  const [assigned, setAssigned] = React.useState(false)

  return (
    <>
      <Button disabled={assigned}> {label} </Button>
    </>
  )
}
