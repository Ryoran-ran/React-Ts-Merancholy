import { useState } from "react"
import Card from "./components/Card"
import { createCards } from "./utils/createCards"

function App() {
  const [cards, setCards] = useState(createCards(6))

  return (
    <div>
      <h1>神経衰弱</h1>

      <div>
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>

    </div>
  )
}

export default App