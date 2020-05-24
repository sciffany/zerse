import React from "react"
import styled from "styled-components"
import { Card } from "antd"

import Divider, { VerticalDivider } from "password/common/Divider"
import { HorizontalStack } from "password/common/Stack"

const VerticalStack = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: top;
`

const PlainHorizontalStack = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export default function Messages() {
  return (
    <>
      <Card style={{ width: 500, marginTop: 20 }}>
        <Divider></Divider>
        <PlainHorizontalStack>
          <VerticalStack>
            <div>
              Tiffany: <b> ??? </b>
            </div>
            <div>
              Jordan: <b> Lion </b>
            </div>
          </VerticalStack>
          <VerticalDivider />
          <VerticalStack>
            <div>
              Pamela: <b> Unicorn </b>
            </div>
            <div>
              Jinger: <b> ??? </b>
            </div>
          </VerticalStack>
        </PlainHorizontalStack>
      </Card>
      <Card style={{ width: 500, marginTop: 20 }}>
        <HorizontalStack spacing={10}>
          <VerticalStack>
            <div>
              Tiffany: <b> Tiger </b>
            </div>
            <div>
              Jordan: <b> Lion </b>
            </div>
          </VerticalStack>
          <VerticalDivider />
          <VerticalStack>
            <div>
              Pamela: <b> Unicorn </b>
            </div>
            <div>
              Jinger: <b> ??? </b>
            </div>
          </VerticalStack>
        </HorizontalStack>
      </Card>
    </>
  )
}
