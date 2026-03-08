import type { CardType } from "../types/Card"
import texts from "../message/ja.json"

type CardProps = {
  card: CardType
  onClick: () => void
}

function Card({ card , onClick }: CardProps) {
  return (
    <button onClick={onClick}>
      {card.isFlipped || card.isMatched ? card.value : texts.card.cardBackSide}
    </button>
  )
}

export default Card