import React from "react"
import socketIOClient from "socket.io-client"
import Signup from "./signup"
import * as _ from "lodash"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

export interface PasswordProps {}

export interface PasswordState {
  mode: number
  roomName: string
  playerName: string
  listOfNames: string[]
  playerOrder: PlayerOrder
  socket: any
  assigned: boolean
}

interface PlayerDetail {
  code: string
  name: string
}

interface RoomDetail {
  listOfNames: string[]
  playerOrder: PlayerOrder
}

interface PlayerOrder {
  [key: string]: string
}

class Password extends React.Component<PasswordProps, PasswordState> {
  state = {
    mode: 0,
    roomName: "",
    playerName: "",
    listOfNames: [],
    playerOrder: {},
    assigned: false,
    socket: socketIOClient(
      "http://ec2-13-229-233-146.ap-southeast-1.compute.amazonaws.com:4001/password"
    )
  }

  constructor(props: any) {
    super(props)
    this.handlePlayer = this.handlePlayer.bind(this)
    this.handleRoom = this.handleRoom.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render() {
    switch (this.state.mode) {
      case 0:
        return this.roomEnter()
      case 1:
        return this.roomCreated()
      default:
        return
    }
  }

  handlePlayer(event: any) {
    this.setState({ playerName: event.target.value })
  }

  handleRoom(event: any) {
    this.setState({ roomName: event.target.value })
  }

  handleSubmit() {
    if (this.state.playerName === "" || this.state.roomName === "") {
    }
    const { socket } = this.state
    socket.emit("sign up", {
      name: this.state.playerName,
      room: this.state.roomName
    })
    socket.on("person joined", (details: RoomDetail) => {
      this.setState({
        listOfNames: details.listOfNames,
        playerOrder: details.playerOrder
      })
      console.log(details.listOfNames)
      console.log(details.playerOrder)
    })

    socket.on("person order", (details: PlayerDetail) => {
      this.setState(prevState => ({
        playerOrder: { ...prevState.playerOrder, [details.code]: details.name }
      }))
      console.log(this.state.playerOrder)
    })
    socket.on("user disconnected", (listOfNames: string[]) => {
      this.setState({ listOfNames: listOfNames })
    })
    this.setState({ mode: 1 })
  }

  private handlePerson = (code: string) => {
    this.state.socket.emit("player order", {
      code,
      name: this.state.playerName,
      room: this.state.roomName
    })
    this.setState({ assigned: true })
  }

  private roomCreated = () => (
    <div>
      <h1> {this.state.roomName} </h1>
      <div>
        <h2>Room successfully joined</h2>
      </div>
      Watchers: {this.state.listOfNames}
      <div>Waiting for other players to join...</div>
      <Form.Label>Team 1:</Form.Label>
      <div className="rows">
        <div className="row">
          <Signup
            name="1"
            color="1"
            code="a"
            handleSignup={this.handlePerson}
            assigned={this.state.assigned}
          />
          {_.get(this.state.playerOrder, "a")}
        </div>

        <div className="row">
          <Signup
            name="2"
            color="1"
            code="b"
            handleSignup={this.handlePerson}
            assigned={this.state.assigned}
          />
          {_.get(this.state.playerOrder, "b")}
        </div>
      </div>
      <Form.Label>Team 2:</Form.Label>
      <div className="rows">
        <div className="row">
          <Signup
            name="1"
            color="2"
            code="c"
            handleSignup={this.handlePerson}
            assigned={this.state.assigned}
          />
          {_.get(this.state.playerOrder, "c")}
        </div>
        <div className="row">
          <Signup
            name="2"
            color="2"
            code="d"
            handleSignup={this.handlePerson}
            assigned={this.state.assigned}
          />
          {_.get(this.state.playerOrder, "d")}
        </div>
      </div>
    </div>
  )

  private roomEnter = () => (
    <div>
      <h1>Hi, Welcome to Password! </h1>
      <div>
        <div>Player Name:</div>
        <input
          type="text"
          name="name"
          value={this.state.playerName}
          onChange={this.handlePlayer}
        />
        <div>Room Name:</div>
        <input
          type="text"
          name="name"
          value={this.state.roomName}
          onChange={this.handleRoom}
        />
        <div>
          <Button onClick={this.handleSubmit}>Create Room</Button>
        </div>
      </div>
    </div>
  )
}

export default Password
