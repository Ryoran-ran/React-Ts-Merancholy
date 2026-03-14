import type { CardType } from "../types/Card"
import texts from "../message/ja.json"

type CardProps = {
  card: CardType
  onClick: () => void
}

function Card({ card , onClick }: CardProps) {
  const cardStateClass = card.isMatched
    ? "card-button is-matched"
    : card.isFlipped
      ? "card-button is-flipped"
      : "card-button"

  return (
    <button className={cardStateClass} onClick={onClick}>
      {card.isFlipped || card.isMatched ? card.value : texts.card.cardBackSide}
    </button>
  )
}

export default Card
