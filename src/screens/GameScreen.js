import React, { useMemo, useState } from "react"
import styled from "styled-components"
import { useMouse } from "react-use"

import { useWindowSize } from "../hooks"

import ruby from "../images/Ruby.png"

const RubyHeight = 80
const RubyWidth = 50

export default function GameScreen() {
  const size = useWindowSize()

  const getRandomNumber = (max) => {
    return Math.floor(Math.random() * Math.floor(max))
  }

  const RubyY = useMemo(
    () => Math.abs(getRandomNumber(size.height - RubyHeight)),
    [size]
  )
  const RubyX = useMemo(
    () => Math.abs(getRandomNumber(size.width - RubyWidth)),
    [size]
  )

  const ref = React.useRef(null)
  const { docX, docY } = useMouse(ref)

  const distanceX = Math.abs(docX - (RubyX + RubyWidth / 2))
  const distanceY = Math.abs(docY - (RubyY + RubyHeight / 2))
  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

  console.log(distance)
  return (
    <PageWrapper ref={ref}>
      {/* <p>RubyX: {RubyX}</p>
      <p>RubyY: {RubyY}</p>
      <p>distanceX: {distanceX}</p>
      <p>distanceY: {distanceY}</p>
      <p>{distance}</p>

      <div>
        Mouse position in document - x:{docX} y:{docY}
      </div>

      <p>
        w: {RubyX} h: {RubyY}
      </p> */}
      <Image
        src={ruby}
        alt="ruby"
        style={{ left: RubyX + "px", top: RubyY + "px" }}
      />
    </PageWrapper>
  )
}

const PageWrapper = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
  position: relative;
  flex-direction: column;
  background: #f0f3f5;
  color: #252938;
`

const Image = styled.img`
  position: relative;
  width: ${RubyWidth + "px"};
  height: ${RubyHeight + "px"};
  /* top: calc(100% - 80px); */
  cursor: pointer;
  /* top: calc(-30% - 40px); */
`
