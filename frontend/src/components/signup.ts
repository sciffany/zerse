import React, { Component } from "react";

class Signup extends Component {
  state = {};
  render() {
    return (
      <div>
        <div class="btn btn-primary">Player {this.props.name}</div>
      </div>
    );
  }
}

export default Signup;
