import { useEffect, useState } from "react"
import Card from "./Card"
import { createCards ,clearCheck ,turnPrev } from "../utils/createCards"
import message from "../message/ja.json"
import type { GameRule } from "../types/Card"
import { useLocation } from 'react-router-dom'


function AppGamePlay() {
  // const navigate = useNavigate()

  const location = useLocation()
  const settings = (location.state ?? {}) as GameRule

  const cardNumber = settings.cards ?? 4

  const [cards, setCards] = useState(createCards(cardNumber))
  const [limitFlipped] = useState(settings.limitFlipped ?? 2)

  const [isChecking, setIsChecking] = useState(false)
  const [turn ,setTurn] = useState(1)
  const [isClear ,setIsClear] = useState(false)

  const handleCardClick = (id: number) => {
    if (isChecking) return

    setCards((prev) => {
      const target = prev.find((c) => c.id === id)
      if (!target || target.isFlipped || target.isMatched) return prev

      const opened = prev.filter((c) => c.isFlipped && !c.isMatched).length
      if (opened >= limitFlipped) return prev

      return prev.map((c) => (c.id === id ? { ...c, isFlipped: true } : c))
    })
  }

  useEffect(() => {
    const opened = cards.filter((c) => c.isFlipped && !c.isMatched)
    if (opened.length !== limitFlipped) return
    setTurn((prev) => prev + 1)
    setIsChecking(true)
    const [a, b] = opened
    

    if (a.value === b.value) {
      setCards((prev) =>
        prev.map((c) => (c.id === a.id || c.id === b.id ? { ...c, isMatched: true } : c))
      )
      setIsChecking(false)
    } else {
      const t = setTimeout(() => {
        setCards((prev) =>
          prev.map((c) => (c.id === a.id || c.id === b.id ? { ...c, isFlipped: false } : c))
        )
        setIsChecking(false)
      }, 700)

      return () => clearTimeout(t)
    }
  }, [cards])

  useEffect(() => {
    setIsClear(clearCheck(cards))
    setTurn((prev) => prev + turnPrev(cards, isClear))
    
  }, [cards])

  return (
    <>
      <div>{message.play.turn}:{turn}</div>
      <div>{isClear ? message.play.gameClear: message.play.gamePlay}</div>

      <div className="card-grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={() => handleCardClick(card.id)} />
        ))}
      </div>
      <button
        type="button"
        onClick={
          () =>{
            setCards(createCards(cardNumber))
            setIsChecking(false)
            setTurn(1)
            setIsClear(false)
          }
          
        }
      >
        {message.play.shuffle}
      </button>
    </>
  )
}


export default AppGamePlay