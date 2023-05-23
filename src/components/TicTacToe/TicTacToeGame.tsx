import React, { useState } from 'react'
import TicTacToeTable from './TicTacToeTable'
import { Coords } from '../../utils/TicTacToe'
import { useTicTacToe } from '../../hooks/useTicTacToe'
import GameControllers from './GameControllers'

const TicTacToeGame = () => {
  const [size, setSize] = useState({ x: 3, y: 3 })
  const [matchLength, setMatchLength] = useState(3)
  const validMatchLength = matchLength > Math.max(size.x, size.y) ? Math.max(size.x, size.y) : matchLength

  const {
    matrix,
    setCharacter,
    currentStepSymbol,
    match,
    isEnd,
    restart
  } = useTicTacToe({ size, matchLength: validMatchLength })

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <TicTacToeTable
        matrix={matrix}
        onElementClick={(coords: Coords) => {
          if (currentStepSymbol) {
            setCharacter(currentStepSymbol, coords)
          }
        }}
        match={match}
        isEnd={isEnd}
      />
      <GameControllers 
        restart={restart}
        isEnd={isEnd}
        size={size}
        matchLength={validMatchLength}
        setSize={setSize}
        setMatchLength={setMatchLength}
      />
    </div>
  )
}

export default TicTacToeGame