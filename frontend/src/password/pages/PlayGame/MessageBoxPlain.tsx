import styled from "styled-components";
import { ChatMessage, PasswordGameState, PositionType } from "./PlayGame";
import React from "react";

const LeftAlign = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const RightAlign = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export default function MessageBoxPlain(props: {
  passwordGameState: PasswordGameState;
}) {
  return (
    <div style={{ overflow: "scroll", height: 200 }}>
      {props.passwordGameState.chatMessages.map((chatMessage: ChatMessage) => {
        if (chatMessage.type === PositionType.HINTER) {
          return (
            <LeftAlign key={Math.random()}>
              {
                props.passwordGameState.currentPlayers[chatMessage.socketId]
                  .username
              }
              : <b> {" " + chatMessage.text}</b>
            </LeftAlign>
          );
        } else {
          return (
            <RightAlign key={Math.random()}>
              {
                props.passwordGameState.currentPlayers[chatMessage.socketId]
                  .username
              }
              : <b> {" " + chatMessage.text}</b>
            </RightAlign>
          );
        }
      })}
    </div>
  );
}
