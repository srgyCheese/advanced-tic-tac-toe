import React from 'react'
import TicTacToeTable from './TicTacToeTable'
import { Coords } from '../../utils/TicTacToe'
import { useTicTacToe } from '../../hooks/useTicTacToe'

const TicTacToeGame = () => {
  const {
    matrix,
    setCharacter,
    currentStepSymbol,
    match,
    isEnd,
    restart
  } = useTicTacToe({})

  return (
    <div>
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
      {isEnd && <button onClick={restart}>Restart</button>}
      
    </div>
  )
}

export default TicTacToeGame