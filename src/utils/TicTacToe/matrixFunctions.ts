import { Coords, Field, FieldTypes, Matrix } from "./types"

const clamp = (min: number, num: number, max: number) => Math.min(Math.max(num, min), max)

export const rotateMatrix = <T extends any>(matrix: T[][]): T[][] => {
  return matrix[0].map((_, index) => matrix.map(row => row[index]).reverse())
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

      matchArray = [field]
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

export const generateEmptyMatrix = (size: Coords): Matrix => {
  return Array(size.y).fill([]).map(() => Array(size.x).fill(FieldTypes.EMPTY))
}

export const getDiagonals = <T extends any>(matrix: T[][]): T[][] => {
  const diagonals: T[][] = []
  const rowsCount = matrix.length
  const columnsCount = matrix[0].length

  const numberOfDiagonals = (rowsCount + columnsCount) - 1

  for (let diagonalIndex = 0; diagonalIndex < numberOfDiagonals; diagonalIndex++) {
    const fromRow = Math.max(0, (diagonalIndex + 1) - columnsCount)
    const fromColumn = Math.min(diagonalIndex, rowsCount - 1)

    const diagonal: T[] = []

    let currentRow = fromRow
    let currentColumn = fromColumn

    while (currentRow <= (rowsCount - 1) && currentColumn >= 0) {      
      diagonal.push(matrix[clamp(0, currentRow, rowsCount - 1)][clamp(0, currentColumn, columnsCount - 1)])

      currentRow++
      currentColumn--
    }

    diagonals.push(diagonal)
  }

  return diagonals
}