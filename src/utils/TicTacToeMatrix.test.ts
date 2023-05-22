import { expect, test } from 'vitest'
import { FieldTypes, TicTacToeMatrix, rotateMatrix } from "./TicTacToeMatrix"

const {O, X, EMPTY} = FieldTypes

const xWinMatrixDiagonal = new TicTacToeMatrix([
  [O, EMPTY,     X],
  [O, X,     EMPTY],
  [X, EMPTY, EMPTY],
])
const xWinMatrixDiagonal2 = new TicTacToeMatrix([
  [X,     EMPTY, O],
  [O,     X,     EMPTY],
  [EMPTY, EMPTY, X],
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

const xWinnerDiagonal5x5 = new TicTacToeMatrix([
  [X, O, O, O],
  [O, X, O, O],
  [O, O, X, O],
  [X, O, O, X],
], 4)

test('Check matrix rotation', () => {
  expect(rotateMatrix([
    [X, X, O],
    [O, O, X],
    [X, X, O],
  ])).toStrictEqual([
    [X, O, X],
    [X, O, X],
    [O, X, O],
  ])

  expect(rotateMatrix([
    [X, X, O, X, X],
    [O, O, X, O, O],
    [X, X, O, X, X],
  ])).toStrictEqual([
    [X, O, X],
    [X, O, X],
    [O, X, O],
    [X, O, X],
    [X, O, X],
  ])
})

test('Check getMatch', () => {
  expect(xWinMatrixDiagonal.getMatch()).toStrictEqual({
    character: FieldTypes.X,
    coords: [
      { x: 2, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 2 },
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

  expect(xWinMatrixDiagonal2.getMatch()).toStrictEqual({
    character: FieldTypes.X,
    coords: [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 2 },
    ]
  })

  expect(fullWithoutWinner.getMatch()).toBe(undefined)

  expect(xWinnerDiagonal5x5.getMatch()).toStrictEqual({
    character: FieldTypes.X,
    coords: [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 3 },
    ]
  })
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