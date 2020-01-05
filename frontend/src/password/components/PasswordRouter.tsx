import React from "react"
import socketIOClient from "socket.io-client"
import { Route, Switch, withRouter } from "react-router"
import { useDispatch, useSelector } from "react-redux"

import Signup from "password/components/Signup"
import routes from "routes"

import PositionAssign from "./PositionAssign"
import { addSocket } from "../features/general/passwordActions"
import passwordSelectors from "../features/general/passwordSelector"

export interface PasswordProps {}

function Password() {
  const dispatch = useDispatch()
  const socket: SocketIOClient.Socket = socketIOClient(
    //http://ec2-13-229-233-146.ap-southeast-1.compute.amazonaws.com
    "localhost:4001/password"
  )

  dispatch(addSocket(socket))

  const errorMessage = useSelector(passwordSelectors.error)

  return (
    <>
      {errorMessage && (
        <>
          <div>Sorry! {errorMessage}</div>
        </>
      )}
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
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
