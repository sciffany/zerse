import styled from "styled-components"

interface Props {
  spacing: number
}

/**
 * Vertical list of items with a preset spacing between each item
 */
const Stack = styled.div<Props>`
  > * + * {
    margin-top: ${({ spacing }) => spacing}px;
  }
`

interface Props {
  spacing: number
}

export const HorizontalStack = styled.div<Props>`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  > * + * {
    margin-left: ${({ spacing }) => spacing}px;
  }
`

export default Stack
