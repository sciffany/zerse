import styled from "styled-components"

export type Color = string

export const TopSpace = styled.div`
  margin-top: 30px;
`

interface ButtonProps {
  height?: number
  color?: Color
}
export const Button = styled.button<ButtonProps>`
  border-radius: 5px;
  display: flex;
  width: 200px;
  height: ${({ height }) => height || 60}px
  color: ${({ color }) => color || "royalblue"}
  border: 2px solid;
  justify-content: center;
  align-items: center;
`
