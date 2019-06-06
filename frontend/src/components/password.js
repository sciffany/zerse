import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Signup from "./signup"

class Password extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      endpoint: "localhost:4001",
      mode: 0,
      value: ""
    };
    this.handleChange = this.handleChange.bind(this);
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

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit() {
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('name', 'Tiffany');
    this.setState({ mode: 1 });
  }

  roomCreated = () => (
    <div>
      <h1> {this.state.value} </h1>
      <div>Room successfully created</div>
      <div>Waiting for other players to join...</div>

      <Signup color="red" />
    </div>
    )

  roomEnter = () => (
    <div>
      <h1>Hi, Welcome to Password! </h1>
      
      <form onSubmit={this.submitFormHandler}>
        <div>
          <input
            type="text"
            name="name"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button onClick={this.handleSubmit}>Create Room</button>
        </div>
      </form>
      <form onSubmit={this.submitFormHandler}>
        <div>
          <input type="text" name="name" ref="name" />
          <button type="submit">Join Room</button>
        </div>
      </form>
    </div>
  );
}

export default Password;
