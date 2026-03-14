export type CardType = {
  id: number
  value: string
  isFlipped: boolean
  isMatched: boolean
}

export type GameRule = {
  pairCount: number
  flipLimit: number
  duplicateMultiplier: number
}
