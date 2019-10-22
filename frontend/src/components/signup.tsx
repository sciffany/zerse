import React from "react"
import Button from "react-bootstrap/Button"

export interface SignupProps {
  name: string
  color: string
  code: string
  handleSignup: any
  assigned: boolean
}

export interface SignupState {}

class Signup extends React.Component<SignupProps, SignupState> {
  state = {}

  constructor(props: any) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleClick} disabled={this.props.assigned}>
          Player {this.props.name}{" "}
        </Button>
      </div>
    )
  }

  handleClick(e: any) {
    this.props.handleSignup(this.props.code)
  }
}

export default Signup
