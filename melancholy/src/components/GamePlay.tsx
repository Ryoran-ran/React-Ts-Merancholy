import { useEffect, useState } from "react"
import type { CSSProperties } from "react"
import Card from "./Card"
import { createCards ,clearCheck ,turnPrev } from "../utils/createCards"
import message from "../message/ja.json"
import type { GameRule } from "../types/Card"
import {useLocation ,useNavigate } from 'react-router-dom'


function AppGamePlay() {
  const navigate = useNavigate()
  const location = useLocation()
  const settings = (location.state ?? {}) as GameRule

  const pairCount = settings.pairCount ?? 4

  const [flipLimit] = useState(settings.flipLimit ?? 2)
  const [duplicateMultiplier] = useState(settings.duplicateMultiplier ?? 1)

  const [cards, setCards] = useState(createCards(pairCount ,flipLimit * duplicateMultiplier))

  const [isChecking, setIsChecking] = useState(false)
  const [turn ,setTurn] = useState(1)
  const [isClear ,setIsClear] = useState(false)

  const handleCardClick = (id: number) => {
    if (isChecking) return

    setCards((prev) => {
      const target = prev.find((c) => c.id === id)
      if (!target || target.isFlipped || target.isMatched) return prev

      const opened = prev.filter((c) => c.isFlipped && !c.isMatched).length
      if (opened >= flipLimit) return prev

      return prev.map((c) => (c.id === id ? { ...c, isFlipped: true } : c))
    })
  }

  useEffect(() => {
    const opened = cards.filter((c) => c.isFlipped && !c.isMatched)

    if (opened.length !== flipLimit) return

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
  }, [cards, flipLimit])


  useEffect(() => {
    setIsClear(clearCheck(cards))
    setTurn((prev) => prev + turnPrev(cards, isClear))
    
  }, [cards])

  const totalCards = cards.length
  const preferredColumns = Math.min(8, Math.max(2, Math.ceil(Math.sqrt(totalCards * 1.4))))
  const gridColumns = preferredColumns % 2 === 0
    ? preferredColumns
    : Math.min(8, preferredColumns + 1)
  const gridRows = Math.ceil(totalCards / gridColumns)
  const gridGap = totalCards >= 30 ? "0.4rem" : totalCards >= 20 ? "0.5rem" : "0.65rem"
  const cardScale = Math.min(1, 12 / Math.max(gridColumns, gridRows))
  const cardFontSize = `${(1.02 + cardScale * 0.7).toFixed(2)}rem`
  const cardPadding = `${(0.2 + cardScale * 0.22).toFixed(2)}rem`
  const cardRadius = `${Math.round(10 + cardScale * 8)}px`
  const boardStyle = {
    "--card-columns": gridColumns,
    "--card-rows": gridRows,
    "--card-gap": gridGap,
    "--card-font-size": cardFontSize,
    "--card-padding": cardPadding,
    "--card-radius": cardRadius,
  } as CSSProperties

  return (
    <main className="screen">
      <section className="panel play-panel">
        <div className="play-header">
          <div className="status-card">
            <span className="status-label">{message.play.turn}</span>
            <strong className="status-value">{turn}</strong>
          </div>
          <div className="status-card">
            <span className="status-label">Status</span>
            <strong className="status-value">{isClear ? message.play.gameClear : message.play.gamePlay}</strong>
          </div>
        </div>

        {/* カード */}
        <div className="card-grid" style={boardStyle}>
          {cards.map((card) => (
            <Card key={card.id} card={card} onClick={() => handleCardClick(card.id)} />
          ))}
        </div>

        <div className="action-row">
          {/* シャッフルボタン */}
          <button
            className="secondary-button"
            type="button"
            onClick={
              () =>{
                setCards(createCards(pairCount ,flipLimit * duplicateMultiplier))
                setIsChecking(false)
                setTurn(1)
                setIsClear(false)
              }
              
            }
          >
            {message.play.shuffle}
          </button>

          {/* メニューに戻るボタン */}
          <button
            className="ghost-button"
            onClick={
              () =>
              navigate('/', {
                  state: {
                      pairCount,
                      flipLimit,
                      duplicateMultiplier,
                  },
              })
            }
          >
            {message.play.backMenu}
          </button>
        </div>
      </section>
    </main>
  )
}


export default AppGamePlay
