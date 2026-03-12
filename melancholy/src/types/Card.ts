export type CardType = {
  id: number
  value: string
  isFlipped: boolean
  isMatched: boolean
}

export type GameRule = {
  cards: number
  limitFlipped: number
}