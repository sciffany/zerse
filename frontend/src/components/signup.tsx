import React, { Component } from "react";
export interface SignupProps {
  name: string;
  color: string;
}

export interface SignupState {}

class Signup extends React.Component<SignupProps, SignupState> {
  state = {};
  render() {
    return <button>Player {this.props.name}</button>;
  }
}

export default Signup;
