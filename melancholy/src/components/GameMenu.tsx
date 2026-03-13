import { useState } from 'react'
import {useLocation ,useNavigate } from 'react-router-dom'
import type { GameRule } from "../types/Card"
import message from "../message/ja.json"


function AppGameMenu() {
    const navigate = useNavigate()
    const location = useLocation()
    const settings = (location.state ?? {}) as GameRule

    const [cards ,setCards] = useState(settings.cards ?? 8)
    const [limitFlipped ,setLimitFlipped] = useState(settings.limitFlipped ?? 2)

    return (
        <>
            <div>{message.title.cardCount}</div>
            <input
                type="number"
                value={cards}
                onChange={(e) => setCards(Number(e.target.value))}
                max={20}
                min={4}
            />
            <br />
            <br />

            <div>{message.title.pairCount}</div>
            <input
                type="number"
                value={limitFlipped}
                onChange={(e) => setLimitFlipped(Number(e.target.value))}
                max={4}
                min={2}
            />
            <br />

            <button onClick={
                () =>
                navigate('/play', {
                    state: {
                        cards,
                        limitFlipped,
                    },
                })
            }>
                {message.title.gameStart}
            </button>
        </>
    )

}

export default AppGameMenu