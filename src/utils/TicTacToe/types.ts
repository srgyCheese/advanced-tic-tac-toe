export enum FieldTypes {
  EMPTY = 0,
  X = 1,
  O = 2
}

export type Coords = { x: number, y: number }

export type Matrix = FieldTypes[][]

export type Field = {
  character: FieldTypes,
  readonly coords: Coords
}

export type Match = {
  character: FieldTypes
  coords: Coords[]
}