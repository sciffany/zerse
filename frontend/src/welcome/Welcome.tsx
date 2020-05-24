import React from "react"
import { useHistory } from "react-router"

import { Button } from "password/common/Styles"

export default function Welcome() {
  const history = useHistory()

  const goToPassword = () => {
    history.push("/password")
  }
  return <Button onClick={goToPassword}>Password</Button>
}
