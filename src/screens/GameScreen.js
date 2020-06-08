import React, { useMemo, useState, useEffect } from "react"
import styled from "styled-components"
import { useMouse } from "react-use"
import useSound from "use-sound"
import { useWindowSize, useInterval } from "../hooks"
import { motion } from "framer-motion"

import Confetti from "react-dom-confetti"

import ruby from "../images/Ruby.png"
import rubyBlinking from "../images/Ruby-blinking.png"
import woofSfx from "../sounds/woof.mp3"
import clinSfx from "../sounds/clin.mp3"
import crowdCheersSfx from "../sounds/crowd-cheers.mp3"
import rubySfx from "../sounds/ruby.mp3"
const RubyHeight = 80
const RubyWidth = 50

export default function GameScreen() {
  const [playCount, setPlayCount] = useState(0)
  const [found, setFound] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showPlayAgain, setShowPlayAgain] = useState(false)
  const [showBlinking, setShowBlinking] = useState(false)
  const [playWoof] = useSound(woofSfx, { volume: 0.22 })
  const [playThatsRuby] = useSound(rubySfx, { volume: 0.48 })
  const [playClin] = useSound(clinSfx, { volume: 0.38 })
  const [playCheers] = useSound(crowdCheersSfx, { volume: 0.38 })
  const [playWoof2] = useSound(woofSfx, { playbackRate: 1.03, volume: 0.33 })
  const [playWoof3] = useSound(woofSfx, { playbackRate: 1.05, volume: 0.44 })
  const [playWoof4] = useSound(woofSfx, { playbackRate: 1.07, volume: 0.55 })
  const [playWoof5] = useSound(woofSfx, { playbackRate: 1.11, volume: 0.63 })
  const size = useWindowSize()

  const restartGame = () => {
    setFound(0)
    setShowConfetti(false)
    setPlayCount(playCount + 1)
    setShowPlayAgain(false)
  }

  const [distanceLevel, setDistanceLevel] = useState(0)
  useInterval(() => {
    if (!found) {
      //   console.log("level: " + distanceLevel)
      playSound()
    }
  }, 630)

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
    [size, playCount]
  )
  const RubyX = useMemo(
    () => Math.abs(getRandomNumber(size.width - RubyWidth)),
    [size, playCount]
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
    if (!found) {
      playThatsRuby()
      setTimeout(() => {
        setShowBlinking(true)
        playClin()
      }, 1400)
      setTimeout(() => {
        playCheers()
        setShowPlayAgain(true)
      }, 2400)
      setTimeout(() => {
        setShowBlinking(false)
      }, 1600)
      setTimeout(() => {
        setShowBlinking(true)
      }, 2800)
      setTimeout(() => {
        setShowBlinking(false)
      }, 3000)
      setTimeout(() => {
        setShowBlinking(true)
      }, 4400)
      setTimeout(() => {
        setShowBlinking(false)
      }, 4600)
      setTimeout(() => {
        setShowBlinking(true)
      }, 6400)
      setTimeout(() => {
        setShowBlinking(false)
      }, 6600)
      setTimeout(() => {
        setShowBlinking(true)
      }, 9400)
      setTimeout(() => {
        setShowBlinking(false)
      }, 9600)
      setTimeout(() => {
        setShowConfetti(true)
      }, 420)
    }
    setFound(true)
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
        <Image
          src={rubyBlinking}
          alt="ruby"
          style={{ opacity: showBlinking ? 1 : 0 }}
        />
        <Image
          onClick={rubyIsFound}
          src={ruby}
          alt="ruby"
          style={{ opacity: showBlinking ? 0 : 1 }}
        />
        <Confetti active={showConfetti} />
        {showPlayAgain && (
          <motion.div
            initial={{ scale: 0.6, opacity: 0, y: 70 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <Button onClick={restartGame}>Play Again!</Button>
          </motion.div>
        )}
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
  position: absolute;
  /* top: calc(100% - 80px); */
  cursor: pointer;
  /* top: calc(-30% - 40px); */
`
const ImageWrapper = styled.div`
  position: relative;
  /* transition: all 0.24s ease-in-out; */
  width: ${RubyWidth + "px"};
  height: ${RubyHeight + "px"};
  &.found img {
    width: ${RubyWidth * 2 + "px"};
    height: ${RubyHeight * 2 + "px"};
  }
  &.found {
    width: ${RubyWidth * 2 + "px"};
    height: ${RubyHeight * 2 + "px"};
    transition: all 0.24s ease-in-out;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`

const Button = styled.button`
  width: 138px;
  will-change: transform, background-color, box-shadow;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(65deg, #158af5 0, #6a72e4 100%);
  box-shadow: 0 8px 16px rgba(35, 129, 244, 0.44);
  padding: 12px 14px;
  color: white;
  border-radius: 6px;
  box-shadow: 0 5px 15px rgba(255, 255, 255, 0.15);
  cursor: pointer;
  transition: all 0.12s ease-in-out;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  /* :hover {
    transform: scale(1.02);
  }
  :active {
    transform: scale(0.98);
  } */
  font-weight: 500;
  text-decoration: none;
  a {
    text-decoration: none;
  }
  &.disabled:hover {
    transform: scale(1);
  }
  font-family: "Wotfard Semibold";
  font-size: 13px;
  margin: 30px 0px;
  margin-top: 285px;
  transform: scale(1.5);
`
