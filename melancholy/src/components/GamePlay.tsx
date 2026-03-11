import { useEffect, useState } from "react"
import Card from "./Card"
import { createCards ,clearCheck ,turnPrev } from "../utils/createCards"
import message from "../message/ja.json"

function AppGamePlay() {
  const [cards, setCards] = useState(createCards(6))
  const [limitFlipped] = useState(2)
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
      <div>{isClear ? "ゲームクリア":"挑戦中"}</div>

      <div>
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={() => handleCardClick(card.id)} />
        ))}
      </div>
      <button
        type="button"
        onClick={
          () =>{
            setCards(createCards(6))
            setIsChecking(false)
            setTurn(1)
            setIsClear(false)
          }
          
        }
      >
        シャッフル
      </button>
    </>
  )
}


export default AppGamePlay