import type { CardType } from "../types/Card"

type CardProps = {
  card: CardType
}

function Card({ card }: CardProps) {
  return (
    <div>
      {card.isFlipped || card.isMatched ? card.value : "?"}
    </div>
  )
}

export default Card