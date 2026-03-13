import { cardValues } from "../data/cards"
import type { CardType } from "../types/Card"


export function createCards(pairCount: number, matchCount: number): CardType[] {
  //ランダムに絵柄を選ぶ
  const selectedValues = [...cardValues]
    .sort(() => Math.random() - 0.5)
    .slice(0, pairCount)

  //ペアを作る
  const values = selectedValues.flatMap((value) =>
    Array(matchCount).fill(value)
  )

  //シャッフル
  const shuffled = values.sort(() => Math.random() - 0.5)

  //カード生成
  return shuffled.map((value, index) => ({
    id: index,
    value,
    isFlipped: false,
    isMatched: false,
  }))
}

export function clearCheck(cards: CardType[]){
    return cards.every((c) => c.isMatched)
}

export function turnPrev(cards: CardType[] ,isClear:boolean){
    var allMatch: Boolean
    allMatch = cards.every((c) => c.isMatched)
    if(allMatch && !isClear){
        return -1;
    }
    return 0;
}