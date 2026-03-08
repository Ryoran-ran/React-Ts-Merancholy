import { cardValues } from "../data/cards"
import type { CardType } from "../types/Card"

export function createCards(pairCount: number): CardType[] {

  // ランダムに絵柄を選ぶ
  const shuffledValues = [...cardValues]
    .sort(() => Math.random() - 0.5)
    .slice(0, pairCount)

  // ペアを作る
  const values = [...shuffledValues, ...shuffledValues]

  // シャッフル
  const shuffled = values.sort(() => Math.random() - 0.5)

  // カード生成
  return shuffled.map((value, index) => ({
    id: index,
    value,
    isFlipped: false,
    isMatched: false,
  }))
}