import { useState } from 'react'
import {useLocation ,useNavigate } from 'react-router-dom'
import type { GameRule } from "../types/Card"


function AppGameMenu() {
    const navigate = useNavigate()
    const location = useLocation()
    const settings = (location.state ?? {}) as GameRule

    const [cards ,setCards] = useState(settings.cards ?? 8)
    const [limitFlipped ,setLimitFlipped] = useState(settings.limitFlipped ?? 2)

    return (
        <>
            <div>Hello world</div>
            <button onClick={
                () =>
                navigate('/play', {
                    state: {
                        cards,
                        limitFlipped,
                    },
                })
            }>
            ゲームスタート！
            </button>
        </>
    )

}

export default AppGameMenu