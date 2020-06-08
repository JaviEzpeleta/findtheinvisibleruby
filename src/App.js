import React, { useState } from "react"
import LaunchScreen from "./screens/LaunchScreen"
import GameScreen from "./screens/GameScreen"

function App() {
  const [gameStarted, setGameStarted] = useState(false)

  const startGame = () => {
    setGameStarted(true)
  }

  if (!gameStarted) return <LaunchScreen startGame={startGame} />
  if (gameStarted) return <GameScreen />

  return <div className="App">FIND RUBY!</div>
}

export default App
