import React from "react"
import socketIOClient from "socket.io-client"
import { Route, Switch, withRouter } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { Alert } from "antd"

import config from "env"
import Signup from "password/components/Signup"
import routes from "routes"

import PositionAssign from "./PositionAssign"
import { addSocket } from "../features/general/passwordActions"
import passwordSelectors from "../features/general/passwordSelector"
import Stack from "common/components/Stack"

export interface PasswordProps {}

function Password() {
  const dispatch = useDispatch()
  const socket: SocketIOClient.Socket = socketIOClient(
    `${config.serverUrl}:${config.serverPort}/password`
  )

  dispatch(addSocket(socket))

  const errorMessage = useSelector(passwordSelectors.error)

  return (
    <>
      {errorMessage && (
        <Alert message={`Sorry!${errorMessage}`} type="error" closable />
      )}

      <Switch>
        <Route
          exact
          path={routes.password.home}
          render={props => <Signup socket={socket} />}
        />
        <Route
          path={routes.password.positionAssign}
          component={PositionAssign}
        />
      </Switch>
    </>
  )
}

export default withRouter(Password)

// class Password extends React.Component<PasswordProps, PasswordState> {
//   state = {
//     roomName: "",
//     playerName: "",
//     listOfNames: [],
//     playerOrder: {},
//     assigned: false,
//     socket: socketIOClient(
//       //http://ec2-13-229-233-146.ap-southeast-1.compute.amazonaws.com
//       "localhost:4001/password"
//     )
//   }

//   constructor(props: any) {
//     super(props)
//     this.handlePlayer = this.handlePlayer.bind(this)
//     this.handleRoom = this.handleRoom.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)
//   }

// socket.on("user disconnected", (listOfNames: string[]) => {
//   this.setState({ listOfNames: listOfNames })
// })

//   private handlePerson = (code: string) => {
//     this.state.socket.emit("player order", {
//       code,
//       name: this.state.playerName,
//       room: this.state.roomName
//     })
//     this.setState({ assigned: true })
//   }
// }
