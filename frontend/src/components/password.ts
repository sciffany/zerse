import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Signup from "./signup";

export interface Password Props {
  
}
 
export interface Password State {
  
}
 
class Password  extends React.Component<Password Props, Password State> {
  state = { :  }
  render() { 
    return (  );
  }
}
 
export default Password ;


class Password extends ReactComponent {
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
    socket.on("name", name => {
      console.log(name);
      this.setState({ listOfNames: name });
    });
  }

  handlePlayer(event) {
    this.setState({ playerName: event.target.value });
  }

  handleRoom(event) {
    this.setState({ roomName: event.target.value });
  }

  handleSubmit() {
    if (this.state.playerName === "" || this.state.room === "") {
    }
    const socket = socketIOClient(this.state.endpoint);
    socket.emit("sign up", {
      name: this.state.playerName,
      room: this.state.room
    });
    this.setState({ mode: 1 });
  }

  roomCreated = () => (
    <div>
      <h1> {this.state.value} </h1>
      <div>
        <h2>Room successfully created</h2>
      </div>
      Members: {this.state.listOfNames}
      <div>Waiting for other players to join...</div>
      Team 1:
      <Signup name="1" color="1" />
      <Signup name="2" color="1" />
      Team 2:
      <Signup name="1" color="2" />
      <Signup name="2" color="2" />
    </div>
  );

  roomEnter = () => (
    <div>
      <h1>Hi, Welcome to Password! </h1>

      <form>
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
            value={this.state.room}
            onChange={this.handleRoom}
          />
          <div>
            <button onClick={this.handleSubmit}>Create Room</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Password;
