import { useState } from 'react'
import {useLocation ,useNavigate } from 'react-router-dom'
import type { GameRule } from "../types/Card"
import message from "../message/ja.json"


function AppGameMenu() {
    const navigate = useNavigate()
    const location = useLocation()
    const settings = (location.state ?? {}) as GameRule

    const [pairCount ,setPairCount] = useState(settings.pairCount ?? 8)
    const [flipLimit ,setFlipLimit] = useState(settings.flipLimit ?? 2)
    const [duplicateMultiplier ,setDuplicateMultiplier] = useState(settings.duplicateMultiplier ?? 1)

    return (
        <>
            {/* カード枚数 */}
            <div>{message.title.cardCount}</div>
            <input
                type="number"
                value={pairCount}
                onChange={(e) => setPairCount(Number(e.target.value))}
                max={20}
                min={4}
            />
            <br />
            <br />

            {/* ペア数 */}
            <div>{message.title.pairCount}</div>
            <input
                type="number"
                value={flipLimit}
                onChange={(e) => setFlipLimit(Number(e.target.value))}
                max={4}
                min={2}
            />
            <br />
            <br />

            {/* 倍数 */}
            <div>{message.title.pairMultiple}</div>
            <input
                type="number"
                value={duplicateMultiplier}
                onChange={(e) => setDuplicateMultiplier(Number(e.target.value))}
                max={2}
                min={1}
            />
            <br />



            <button onClick={
                () =>
                navigate('/play', {
                    state: {
                        pairCount,
                        flipLimit,
                        duplicateMultiplier,
                    },
                })
            }>
                {message.title.gameStart}
            </button>
        </>
    )

}

export default AppGameMenu
