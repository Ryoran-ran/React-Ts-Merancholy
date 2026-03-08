import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { cardsData } from "./data/cards"
import Card from "./components/Card"

function App() {
  return (
    <div>
      <h1>神経衰弱</h1>
      <div>
        {cardsData.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  )
}

export default App
