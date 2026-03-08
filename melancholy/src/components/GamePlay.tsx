import { useState } from "react"
import Card from "../components/Card"
import { createCards } from "../utils/createCards"
import texts from "../message/ja.json"

function AppGamePlay() {
    const [cards, setCards] = useState(createCards(6))

    const handleCardClick = (id: number) => {
        setCards((prev) =>
            prev.map((c) =>
                c.id === id ? { ...c, isFlipped: true } : c
            )
        )
    }

    return (
        <div>
        <h1>{texts.title.titleMain}</h1>

        <div>
            {cards.map((card) => (
                <Card key={card.id} card={card} onClick={() => handleCardClick(card.id)}/>
            ))}
        </div>

        </div>
    )
}

export default AppGamePlay