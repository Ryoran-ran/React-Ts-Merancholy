import { useEffect, useState } from "react"
import Card from "./Card"
import { createCards ,clearCheck ,turnPrev } from "../utils/createCards"
import message from "../message/ja.json"
import type { GameRule } from "../types/Card"
import {useLocation ,useNavigate } from 'react-router-dom'


function AppGamePlay() {
  const navigate = useNavigate()
  const location = useLocation()
  const settings = (location.state ?? {}) as GameRule

  const cardNumber = settings.cards ?? 4

  const [limitFlipped] = useState(settings.limitFlipped ?? 2)
  const [pairMultiple] = useState(settings.pairMultiple ?? 1)

  const [cards, setCards] = useState(createCards(cardNumber ,limitFlipped * pairMultiple))

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

    const isMatch = opened.every((card) => card.value === opened[0].value)

    if (isMatch) {
      setCards((prev) =>
        prev.map((c) =>
          opened.some((o) => o.id === c.id) ? { ...c, isMatched: true } : c
        )
      )
      setIsChecking(false)
    } else {
      const t = setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            opened.some((o) => o.id === c.id) ? { ...c, isFlipped: false } : c
          )
        )
        setIsChecking(false)
      }, 700)

      return () => clearTimeout(t)
    }
  }, [cards, limitFlipped])


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
      <div>-------------------------------------------</div>
      {/* シャッフルボタン */}
      <button
        type="button"
        onClick={
          () =>{
            setCards(createCards(cardNumber ,limitFlipped * pairMultiple))
            setIsChecking(false)
            setTurn(1)
            setIsClear(false)
          }
          
        }
      >
        {message.play.shuffle}
      </button>

      {/* メニューに戻るボタン */}
      <button onClick={
        () =>
        navigate('/', {
            state: {
                cards: cardNumber,
                limitFlipped,
                pairMultiple,
            },
        })
      }>
        {message.play.backMenu}
      </button>


    </>
  )
}


export default AppGamePlay