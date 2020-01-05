import React from "react"
import { useHistory } from "react-router"
import { Button } from "common/components/Styles"

export default function PositionTypes() {
  const history = useHistory()
  return <Button onClick={() => history.push("/password")}>Password</Button>
}
