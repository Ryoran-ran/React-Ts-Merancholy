import type { CardType } from "../types/Card"

type CardProps = {
  card: CardType
  onClick: () => void
}

function Card({ card , onClick }: CardProps) {
  return (
    <button onClick={onClick}>
      {card.isFlipped || card.isMatched ? card.value : "?"}
    </button>
  )
}

export default Card