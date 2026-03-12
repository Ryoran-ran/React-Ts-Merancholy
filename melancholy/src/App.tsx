import { BrowserRouter, Routes, Route } from "react-router-dom"
import GameMenu from "./components/GameMenu"
import GamePlay from "./components/GamePlay"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GameMenu />} />
        <Route path="/play" element={<GamePlay />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
