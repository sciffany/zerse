import styled from "styled-components"

export const TopSpace = styled.div`
  margin-top: 30px;
`

interface ButtonProps {}
export const Button = styled.button<ButtonProps>`
  border-radius: 5px;
  display: flex;
  width: 200px;
  height: 60px;
  color: royalblue;
  border: 2px solid;
  justify-content: center;
  align-items: center;
  border-color: royalblue;
`
