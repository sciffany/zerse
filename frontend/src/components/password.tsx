import React from "react";
import socketIOClient from "socket.io-client";
import Signup from "./signup.tsx";

export interface PasswordProps {}

export interface PasswordState {
  endpoint: string;
  mode: number;
  roomName: string;
  playerName: string;
  listOfNames: string;
}

class Password extends React.Component<PasswordProps, PasswordState> {
  state = {
    endpoint: "localhost:4001/password",
    mode: 0,
    roomName: "",
    playerName: "",
    listOfNames: ""
  };

  constructor(props) {
    super(props);
    this.handlePlayer = this.handlePlayer.bind(this);
    this.handleRoom = this.handleRoom.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    switch (this.state.mode) {
      case 0:
        return this.roomEnter();
      case 1:
        return this.roomCreated();
      default:
        return;
    }
  }

  componentDidMount() {
    const socket = socketIOClient(this.state.endpoint);
    socket.on("person joined", listOfNames => {
      console.log(listOfNames);
      this.setState({ listOfNames: listOfNames });
    });
  }

  handlePlayer(event) {
    this.setState({ playerName: event.target.value });
  }

  handleRoom(event) {
    this.setState({ roomName: event.target.value });
  }

  handleSubmit() {
    if (this.state.playerName === "" || this.state.roomName === "") {
    }
    const socket = socketIOClient(this.state.endpoint);
    socket.emit("sign up", {
      name: this.state.playerName,
      room: this.state.roomName
    });
    this.setState({ mode: 1 });
  }

  private roomCreated = () => (
    <div>
      <h1> {this.state.roomName} </h1>
      <div>
        <h2>Room successfully joined</h2>
      </div>
      Watchers: {this.state.listOfNames}
      <div>Waiting for other players to join...</div>
      Team 1:
      <Signup name="1" color="1" />
      <Signup name="2" color="1" />
      Team 2:
      <Signup name="1" color="2" />
      <Signup name="2" color="2" />
    </div>
  );

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
          <button onClick={this.handleSubmit}>Create Room</button>
        </div>
      </div>
    </div>
  );
}

export default Password;
