export enum FieldTypes {
  EMPTY = 0,
  X = 1,
  O = 2
}

export type Matrix = FieldTypes[][]

type FieldsArray = {
  character: FieldTypes,
  coords: {
    x: number,
    y: number
  }
}[]

export class TicTacToeMatrix {
  matrix: Matrix

  constructor(matrix: Matrix) {
    this.matrix = matrix
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
  
  private getMatchInDiagonals() {
    const diagonals: FieldsArray[] = []
  
    diagonals.push(this.matrix.map((row, column) => ({
      character: row[column],
      coords: {
        x: column,
        y: column
      }
    })))
  
    diagonals.push(this.matrix.map((row, column) => ({
      character: row[row.length - column - 1],
      coords: {
        x: column,
        y: row.length - column - 1
      }
    })))
    
  
    for (const diagonal of diagonals) {
      if (diagonal.every( field => field.character !== FieldTypes.EMPTY && field.character === diagonal[0].character )) {
        return {
          character: diagonal[0].character,
          coords: diagonal.map((el, x) => el.coords)
        }
      }
    }
  }
  
  private getMatchInRow(matrix = this.matrix) {
    for (let row = 0; row < matrix.length; row++) {
      if (matrix[row].every( v => v !== FieldTypes.EMPTY && v === matrix[row][0] )) {
        return {
          character: matrix[row][0],
          coords: matrix[row].map((el, x) => ({
            y: row,
            x
          }))
        }
      }
    }
  }
  
  private getMatchInColumn() {
    const transposedMatrix = this.transposed()
    
    for (let row = 0; row < transposedMatrix.length; row++) {
      const matrixRow = transposedMatrix[row]
      if (matrixRow.every( v => v !== FieldTypes.EMPTY && v === matrixRow[0] )) {
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
  
  getMatch() {
    const horizontalMatch = this.getMatchInRow()
  
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