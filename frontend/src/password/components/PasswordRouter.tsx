import React from "react"
import { Route, Switch, withRouter } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { Alert } from "antd"

import Signup from "password/components/Signup"
import routes from "routes"

import PositionAssign from "./PositionAssign"
import passwordSelectors from "../features/general/passwordSelector"
import { deleteError } from "password/features/general/passwordActions"

export interface PasswordProps {}

function Password() {
  const errorMessage = useSelector(passwordSelectors.error)
  const dispatch = useDispatch()

  const closeModal = () => dispatch(deleteError())

  return (
    <>
      {errorMessage && (
        <Alert
          message={`Sorry! ${errorMessage}`}
          type="error"
          closable
          onClose={closeModal}
        />
      )}

      <Switch>
        <Route exact path={routes.password.home} component={Signup} />
        <Route
          path={routes.password.positionAssign}
          component={PositionAssign}
        />
      </Switch>
    </>
  )
}

export default withRouter(Password)
