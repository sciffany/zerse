import styled from "styled-components"

/**
 * Div that
 *
 * 1. Horizontally and vertically centers its contents
 * 2. Expands to fit its parent (if its a flex)
 *
 */
const Centered = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;

  flex-grow: 1;
`
export default Centered
