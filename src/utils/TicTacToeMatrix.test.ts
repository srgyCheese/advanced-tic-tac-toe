import { assert, expect, test } from 'vitest'
import { FieldTypes, TicTacToeMatrix } from "./TicTacToeMatrix"

const {O, X, EMPTY} = FieldTypes

const xWinMatrixDiagonal = new TicTacToeMatrix([
  [O, EMPTY,     X],
  [O, X,     EMPTY],
  [X, EMPTY, EMPTY],
])

const xWinMatrixColumn = new TicTacToeMatrix([
  [O,     X, EMPTY],
  [O,     X, EMPTY],
  [EMPTY, X, EMPTY],
])

const fullWithoutWinner = new TicTacToeMatrix([
  [X, X, O],
  [O, O, X],
  [X, X, O],
])

test('Check getMatch', () => {
  expect(xWinMatrixDiagonal.getMatch()).toStrictEqual({
    character: FieldTypes.X,
    coords: [
      { x: 0, y: 2 },
      { x: 1, y: 1 },
      { x: 2, y: 0 }
    ]
  })

  expect(xWinMatrixColumn.getMatch()).toStrictEqual({
    character: FieldTypes.X,
    coords: [
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: 2 }
    ]
  })

  expect(fullWithoutWinner.getMatch()).toBe(undefined)
})

test('Check isFull', () => {
  expect(xWinMatrixDiagonal.isFull()).toBe(false)

  expect(xWinMatrixColumn.isFull()).toBe(false)

  expect(fullWithoutWinner.isFull()).toBe(true)
})

test('Check current step', () => {
  expect(xWinMatrixDiagonal.getCurrentStepSymbol()).toBe(FieldTypes.O)

  expect(xWinMatrixColumn.getCurrentStepSymbol()).toBe(FieldTypes.O)
  
  expect(fullWithoutWinner.getCurrentStepSymbol()).toBe(undefined)
})