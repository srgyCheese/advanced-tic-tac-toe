import { Field, FieldTypes, Matrix } from "./types"

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