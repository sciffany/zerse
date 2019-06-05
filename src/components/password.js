import React, { Component } from "react";

class Password extends Component {
  state = {
    mode: 0,
    value: ""
  };
  render() {
    switch (this.state.mode) {
      case 0:
        return this.roomEnter();
      case 1:
        return <h1>Room created</h1>;
      default:
        return;
    }
  }

  submitFormHandler(event) {
    event.preventDefault();
    this.setState({ mode: 1, value: this.refs.name.value });
  }

  handleChange(event) {
    console.log("F");
    this.setState({ value: event.target.value });
  }

  roomEnter = () => (
    <div>
      <h1>Hi, welcome to Password!</h1>
      <form onSubmit={this.submitFormHandler}>
        <div>
          <input
            type="text"
            name="name"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button type="submit">Create Room</button>
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
