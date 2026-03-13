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
    const [pairMultiple ,setPairMultiple] = useState(settings.pairMultiple ?? 1)

    return (
        <>
            {/* カード枚数 */}
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

            {/* ペア数 */}
            <div>{message.title.pairCount}</div>
            <input
                type="number"
                value={limitFlipped}
                onChange={(e) => setLimitFlipped(Number(e.target.value))}
                max={4}
                min={2}
            />
            <br />
            <br />

            {/* 倍数 */}
            <div>{message.title.pairMultiple}</div>
            <input
                type="number"
                value={pairMultiple}
                onChange={(e) => setPairMultiple(Number(e.target.value))}
                max={2}
                min={1}
            />
            <br />



            <button onClick={
                () =>
                navigate('/play', {
                    state: {
                        cards,
                        limitFlipped,
                        pairMultiple,
                    },
                })
            }>
                {message.title.gameStart}
            </button>
        </>
    )

}

export default AppGameMenu