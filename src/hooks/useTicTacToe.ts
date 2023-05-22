import { useState, useCallback, useMemo, useEffect } from 'react'
import { Coords } from "../utils/TicTacToe"
import { TicTacToeMatrix } from "../utils/TicTacToe/TicTacToeMatrix"
import { generateEmptyMatrix } from "../utils/TicTacToe/matrixFunctions"
import { FieldTypes } from '../utils/TicTacToe/types'

type MatrixSettings = {size?: Coords, matchLength?: number}

export const useTicTacToe = ({size = {x: 3, y: 3}, matchLength = 3}: MatrixSettings) => {
  const [matrix, setMatrix] = useState(generateEmptyMatrix(size))
  
  const ticTacToeMatrix = useMemo(() => new TicTacToeMatrix(matrix, matchLength), [matrix, matchLength])

  useEffect(() => {
    setMatrix(generateEmptyMatrix(size))
  }, [size.x, size.y])

  const setCharacter = useCallback((character: FieldTypes.O | FieldTypes.X, coords: Coords) => {
    ticTacToeMatrix.setCharacter(character, coords)
    setMatrix([...ticTacToeMatrix.matrix])
  }, [matrix])

  const currentStepSymbol = useMemo(() => ticTacToeMatrix.getCurrentStepSymbol(), [matrix])
  const isFull = useMemo(() => ticTacToeMatrix.isFull(), [matrix])
  const match = useMemo(() => ticTacToeMatrix.getMatch(), [matrix])
  const isEnd = useMemo(() => ticTacToeMatrix.isEnd(), [matrix])
  const restart = useCallback(() => setMatrix(generateEmptyMatrix(size)), [size.x, size.y])
  
  return {
    matrix,
    setCharacter,
    currentStepSymbol,
    isFull,
    match,
    isEnd,
    restart
  }
}