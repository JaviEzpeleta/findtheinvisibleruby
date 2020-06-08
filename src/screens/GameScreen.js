import React, { useMemo, useState, useEffect } from "react"
import styled from "styled-components"
import { useMouse } from "react-use"
import useSound from "use-sound"
import { useWindowSize, useInterval } from "../hooks"

import Confetti from "react-dom-confetti"

import ruby from "../images/Ruby.png"
import woofSfx from "../sounds/woof.mp3"
import rubySfx from "../sounds/ruby.mp3"
const RubyHeight = 80
const RubyWidth = 50

export default function GameScreen() {
  const [found, setFound] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [playWoof] = useSound(woofSfx, { volume: 0.2 })
  const [playThatsRuby] = useSound(rubySfx, { volume: 0.3 })
  const [playWoof2] = useSound(woofSfx, { playbackRate: 1.03, volume: 0.3 })
  const [playWoof3] = useSound(woofSfx, { playbackRate: 1.05, volume: 0.45 })
  const [playWoof4] = useSound(woofSfx, { playbackRate: 1.07, volume: 0.55 })
  const [playWoof5] = useSound(woofSfx, { playbackRate: 1.09, volume: 0.63 })
  const size = useWindowSize()

  const [distanceLevel, setDistanceLevel] = useState(0)
  useInterval(() => {
    if (!found) {
      console.log("level: " + distanceLevel)
      playSound()
    }
  }, 650)

  const playSound = () => {
    if (distanceLevel === 4) playWoof5()
    if (distanceLevel === 3) playWoof4()
    if (distanceLevel === 2) playWoof3()
    if (distanceLevel === 1) playWoof2()
    if (distanceLevel === 0) playWoof()
  }

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

  useEffect(() => {
    if (distance < 90) {
      setDistanceLevel(4)
    } else if (distance < 200) {
      setDistanceLevel(3)
    } else if (distance < 250) {
      setDistanceLevel(2)
    } else if (distance < 500) {
      setDistanceLevel(1)
    } else {
      setDistanceLevel(0)
    }
  }, [distance])

  const rubyIsFound = () => {
    if (!found) playThatsRuby()
    setFound(true)
    setTimeout(() => {
      setShowConfetti(true)
    }, 200)
  }
  return (
    <PageWrapper ref={ref}>
      <ImageWrapper
        className={found ? "found" : ""}
        style={{
          position: "absolute",
          opacity: found ? 1 : 0,
          top: found ? "calc(50% - " + RubyHeight + "px)" : RubyY + "px",
          left: found ? "calc(50% - " + RubyWidth + "px)" : RubyX + "px",
        }}
      >
        <Image onClick={rubyIsFound} src={ruby} alt="ruby" />
        <Confetti active={showConfetti} />
      </ImageWrapper>
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
  overflow: hidden;
`

const Image = styled.img`
  width: ${RubyWidth + "px"};
  height: ${RubyHeight + "px"};
  /* top: calc(100% - 80px); */
  cursor: pointer;
  /* top: calc(-30% - 40px); */
`
const ImageWrapper = styled.div`
  transition: all 0.3s ease-in-out;
  &.found img {
    width: ${RubyWidth * 2 + "px"};
    height: ${RubyHeight * 2 + "px"};
  }
`
