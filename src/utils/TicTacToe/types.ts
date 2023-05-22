export enum FieldTypes {
  EMPTY = 0,
  X = 1,
  O = 2
}

export type Matrix = FieldTypes[][]

export type Field = {
  character: FieldTypes,
  readonly coords: {
    x: number,
    y: number
  }
}

export type Match = {
  character: FieldTypes
  coords: {
      y: number
      x: number
  }[]
}