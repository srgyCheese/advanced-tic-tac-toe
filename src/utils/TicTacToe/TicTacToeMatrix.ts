import { formatMatrix, getDiagonals, getLongestMatchArray, rotateMatrix } from './matrixFunctions';
import { Coords, Field, FieldTypes, Match, Matrix } from "./types"

export class TicTacToeMatrix {
  matrix: Matrix
  fieldMatrix: Field[][]
  matchLength: number

  constructor(matrix: Matrix, matchLength: number = 3) {
    if (matchLength > matrix[0].length && matchLength > matrix.length) {
      matchLength = Math.max(matrix[0].length, matrix.length)
    }

    this.matrix = matrix
    this.fieldMatrix = formatMatrix(matrix)

    this.matchLength = matchLength
  }

  setMatrix(matrix: Matrix) {
    this.matrix = matrix
    this.fieldMatrix = formatMatrix(matrix)
  }

  getCurrentStepSymbol() {
    const flatMatrix = this.matrix.flat()

    if (!flatMatrix.some(field => field === FieldTypes.EMPTY)) {
      return
    }

    const xCount = flatMatrix.filter(item => item === FieldTypes.X).length
    const oCount = flatMatrix.filter(item => item === FieldTypes.O).length

    return (xCount - oCount) === 0 ? FieldTypes.X : FieldTypes.O
  }

  private transposed() {
    let [firstRow] = this.matrix
    return firstRow.map((_, column) => this.matrix.map(row => row[column]))
  }

  private rotated() {
    return rotateMatrix(this.fieldMatrix)
  }

  getDiagonals(rotated?: boolean) {
    let matrix = rotated ? this.rotated() : this.fieldMatrix

    return getDiagonals(matrix)
  }

  private getMatchInDiagonals() {
    const diagonals = [...this.getDiagonals(), ...this.getDiagonals(true)]

    for (let diagonal of diagonals) {
      const match = this.getMatchInRow(diagonal)

      if (match) {
        return match
      }
    }
  }

  private getMatchInRow(row: Field[]): Match | undefined {
    if (row.length < this.matchLength) {
      return
    }

    const longestMatchArray = getLongestMatchArray(row)

    if (longestMatchArray.length >= this.matchLength) {
      return {
        character: longestMatchArray[0].character,
        coords: longestMatchArray.map(field => field.coords)
      }
    }
  }

  private getMatchInRows(transposed?: boolean) {
    let matrix = transposed ? this.transposed() : this.matrix

    for (let row = 0; row < matrix.length; row++) {
      const fieldsRow: Field[] = matrix[row].map((character, column) => ({
        character,
        coords: transposed ? { x: row, y: column } : { x: column, y: row }
      }))

      const match = this.getMatchInRow(fieldsRow)

      if (match) {
        return match
      }
    }
  }

  isFull() {
    return this.matrix.flat().every(v => v !== FieldTypes.EMPTY)
  }

  getMatch(): Match | undefined {
    const horizontalMatch = this.getMatchInRows()

    if (horizontalMatch) {
      return horizontalMatch
    }

    const verticalMatch = this.getMatchInRows(true)

    if (verticalMatch) {
      return verticalMatch
    }

    const diagonalsMatch = this.getMatchInDiagonals()

    if (diagonalsMatch) {
      return diagonalsMatch
    }
  }

  getCharacter(coords: Coords) {
    return this.matrix[coords.y][coords.x]
  }

  isEnd() {
    return !!this.getMatch() || this.isFull()
  }

  isStarted() {
    return this.matrix.flat().some(character => character !== FieldTypes.EMPTY)
  }

  setCharacter(character: FieldTypes.X | FieldTypes.O, coords: Coords) {
    if (character !== this.getCurrentStepSymbol()) {
      return
    }

    if (this.getCharacter(coords) !== FieldTypes.EMPTY) {
      return
    }

    if (this.isEnd()) {
      return
    }

    this.matrix[coords.y][coords.x] = character
    this.setMatrix(this.matrix)
  }
}