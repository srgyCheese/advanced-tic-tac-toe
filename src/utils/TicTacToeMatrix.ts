export enum FieldTypes {
  EMPTY = 0,
  X = 1,
  O = 2
}

export type Matrix = FieldTypes[][]

type Field = {
  character: FieldTypes,
  readonly coords: {
    x: number,
    y: number
  }
}

type Match = {
  character: FieldTypes
  coords: {
      y: number
      x: number
  }[]
}

export const rotateMatrix = <T extends any[][]>(matrix: T) => {
  return matrix[0].map((val, index) => matrix.map(row => row[index]).reverse())
}

export const getLongestMatchArray = (fields: Field[]) => {
  let matchArray: Field[] = []
  let longestMatchArray: Field[] = []
  
  for (const field of fields) {
    if (field.character === FieldTypes.EMPTY) {
      if (matchArray.length > longestMatchArray.length) {
        longestMatchArray = [...matchArray]
      }

      matchArray = []
      continue
    }

    if (matchArray.length === 0) {
      matchArray.push(field)
      continue
    }

    const arrayCharacter = matchArray[0].character

    if (arrayCharacter === field.character) {
      matchArray.push(field)
    } else {
      if (matchArray.length > longestMatchArray.length) {
        longestMatchArray = [...matchArray]
      }

      matchArray = []
    }
  }

  if (matchArray.length > longestMatchArray.length) {
    longestMatchArray = [...matchArray]
  }

  return longestMatchArray
}

export const formatMatrix = (matrix: Matrix) => {
  return matrix.map((row, rowIndex) => {
    return row.map((field, column) => ({
      character: field,
      coords: {
        x: column,
        y: rowIndex
      }
    }))
  })
}

export class TicTacToeMatrix {
  matrix: Matrix
  fieldMatrix: Field[][]
  matchLength: number

  constructor(matrix: Matrix, matchLength: number = 3) {
    if (matchLength < matrix[0].length && matchLength < matrix.length) {
      throw new Error('Matrix match length should be lower then matrix height or width')
    }

    this.matrix = matrix

    this.fieldMatrix = formatMatrix(matrix)

    this.matchLength = matchLength
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

  transposed() {
    let [firstRow] = this.matrix
    return firstRow.map((value, column) => this.matrix.map(row => row[column]))
  }

  rotated() {
    return rotateMatrix(this.fieldMatrix)
  }

  getDiagonals(rotated?: boolean) {
    let matrix = rotated ? this.rotated() : this.fieldMatrix

    const diagonals: Field[][] = []
    const rowsCount = matrix.length
    const columnsCount = matrix[0].length

    const numberOfDiagonals = (rowsCount + columnsCount) - 1

    for (let diagonalIndex = 0; diagonalIndex < numberOfDiagonals; diagonalIndex++) {
      const fromRow = Math.max(0, (diagonalIndex + 1) - columnsCount)
      const fromColumn = Math.min(diagonalIndex, rowsCount)

      const diagonal: Field[] = []

      let currentRow = fromRow
      let currentColumn = fromColumn

      while (currentRow <= (rowsCount - 1) && currentColumn >= 0 && matrix[currentRow][currentColumn] !== undefined) {
        diagonal.push({
          character: matrix[currentRow][currentColumn].character,
          coords: matrix[currentRow][currentColumn].coords
        })

        currentRow++
        currentColumn--
      }

      diagonals.push(diagonal)
    }

    return diagonals
  }

  getMatchInDiagonals() {
    const diagonals: Field[][] = [...this.getDiagonals(), ...this.getDiagonals(true)]

    for (let diagonal of diagonals) {
      const match = this.getMatchInRow(diagonal)

      if (match) {
        return match
      }
    }
  }

  private getMatchInRows(matrix = this.matrix) {
    for (let row = 0; row < matrix.length; row++) {
      const fieldsRow: Field[] = matrix[row].map((character, column) => ({
        character,
        coords: {
          x: column, 
          y: row
        }
      }))

      const match = this.getMatchInRow(fieldsRow)

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

  private getMatchInColumn() {
    const transposedMatrix = this.transposed()

    for (let row = 0; row < transposedMatrix.length; row++) {
      const matrixRow = transposedMatrix[row]
      if (matrixRow.every(v => v !== FieldTypes.EMPTY && v === matrixRow[0])) {
        return {
          character: matrixRow[0],
          coords: matrixRow.map((el, y) => ({
            y,
            x: row
          }))
        }
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

    const verticalMatch = this.getMatchInColumn()

    if (verticalMatch) {
      return verticalMatch
    }

    const diagonalsMatch = this.getMatchInDiagonals()

    if (diagonalsMatch) {
      return diagonalsMatch
    }
  }
}