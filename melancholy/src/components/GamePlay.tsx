import { useState } from "react"
import Card from "../components/Card"
import { createCards } from "../utils/createCards"
import { countFlip } from "../utils/reverseCards"
import texts from "../message/ja.json"

function AppGamePlay() {
    const [cards, setCards] = useState(createCards(6))
    const [countFliped, setCountFliped] = useState(0)
    const [limitFliped, setLimitFliped] = useState(2)


    const handleCardClick = (id: number) => {
        setCards((prev) =>{
            //すでに2枚めくれていたら何もしない
            const flippedCount = prev.filter((c) => c.isFlipped && !c.isMatched).length
            if (flippedCount >= 2) return prev

            return prev.map((c) =>
                c.id === id ? { ...c, isFlipped: true } : c
            )
        
        })
    }

    return (
        <div>
            <h1>{texts.title.titleMain}</h1>
            <div>{countFliped}</div>
            <div>
                {cards.map((card) => (
                    <Card 
                        key={card.id}
                        card={card}
                        onClick={
                            () => {
                                handleCardClick(card.id)
                                setCountFliped(countFlip(card.isFlipped,countFliped,limitFliped))
                            }
                        }
                    />
                ))}
            </div>

        </div>
    )
}

export default AppGamePlay