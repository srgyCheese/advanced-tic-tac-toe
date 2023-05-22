import React, { useState } from 'react'
import TicTacToeTable from './TicTacToeTable'
import { Coords } from '../../utils/TicTacToe'
import { useTicTacToe } from '../../hooks/useTicTacToe'
import { useEffect } from 'react';

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
      {isEnd ? (
        <button onClick={restart}>Restart</button>
      ) : (
        <>
          Field size: {size.x}x{size.y}
          <input
            type='range'
            style={{ width: '100%' }}
            min={1}
            max={15}
            step={1}
            value={size.x}
            onChange={e => setSize({
              x: +e.target.value,
              y: +e.target.value
            })}
          />
          You should match: {validMatchLength} items
          <input
            type='range'
            style={{ width: '100%' }}
            min={1}
            max={Math.max(size.x, size.y)}
            step={1}
            value={validMatchLength}
            onChange={e => setMatchLength(+e.target.value)}
          />
        </>
      )}
    </div>
  )
}

export default TicTacToeGame