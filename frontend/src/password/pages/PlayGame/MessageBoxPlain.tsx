import React from "react"
import styled from "styled-components"

const LeftAlign = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

const RightAlign = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

export default function Messages() {
  return (
    <>
      <LeftAlign>
        You: <b>BLUBBER</b>
      </LeftAlign>
      <RightAlign>
        Pamela: <b>WHALE?</b>
      </RightAlign>
      <LeftAlign>
        Jordan: <b>TIGER</b>
      </LeftAlign>{" "}
      <RightAlign>
        Jinger: <b>WALLET?</b>
      </RightAlign>{" "}
      <LeftAlign>
        You: <b>BLUBBER</b>
      </LeftAlign>
      <RightAlign>
        Pamela: <b>WHALE?</b>
      </RightAlign>
      <LeftAlign>
        Jordan: <b>BLUBBER</b>
      </LeftAlign>
    </>
  )
}
