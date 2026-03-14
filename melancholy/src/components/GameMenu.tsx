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
        <main className="screen">
            <section className="panel menu-panel">
                <p className="eyebrow">{message.title.titleSub}</p>
                <h1 className="screen-title">{message.title.titleMain}</h1>
                <p className="screen-description">{message.title.gameRule}</p>

                <div className="menu-form">
                    {/* カード枚数 */}
                    <label className="field">
                        <span className="field-label">{message.title.cardCount}</span>
                        <input
                            className="number-input"
                            type="number"
                            value={pairCount}
                            onChange={(e) => setPairCount(Number(e.target.value))}
                            max={20}
                            min={4}
                        />
                    </label>

                    {/* ペア数 */}
                    <label className="field">
                        <span className="field-label">{message.title.pairCount}</span>
                        <input
                            className="number-input"
                            type="number"
                            value={flipLimit}
                            onChange={(e) => setFlipLimit(Number(e.target.value))}
                            max={4}
                            min={2}
                        />
                    </label>

                    {/* 倍数 */}
                    <label className="field">
                        <span className="field-label">{message.title.pairMultiple}</span>
                        <input
                            className="number-input"
                            type="number"
                            value={duplicateMultiplier}
                            onChange={(e) => setDuplicateMultiplier(Number(e.target.value))}
                            max={2}
                            min={1}
                        />
                    </label>
                </div>

                <button
                    className="primary-button"
                    onClick={
                        () =>
                        navigate('/play', {
                            state: {
                                pairCount,
                                flipLimit,
                                duplicateMultiplier,
                            },
                        })
                    }
                >
                    {message.title.gameStart}
                </button>
            </section>
        </main>
    )

}

export default AppGameMenu
