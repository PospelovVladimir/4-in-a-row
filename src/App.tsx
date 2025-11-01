import { useState } from "react"
import "./App.scss"
import GameBoard from "./components/GameBoard/GameBoard"
import HeaderWithHero from "./components/HeaderWithHero/HeaderWithHero"
import type { TVariantCell } from "./components/GameCell/GameCell"

const App = () => {
  const [isGameActive, setIsGameActive] = useState(false)
  const [chooseChip, setChooseChip] = useState<TVariantCell | null>(null)
  const [currentPlayer, setCurrentPlayer] = useState(false)

  /* 
  
  TODO
  - добавить функцию выбора фишки компьютером после выбора фишки игроком
  - передавать выбранные фишки в гейм поле (1 фишка это игрок)
  - убрать генерацию фишек рандомно с игрового поля
  - добавить алгоритм хода компьютером после хода игрока (возможно с задержкой)
      предусмотреть невозможность хода игроком пока ходит компьютер
  - добавить алгоритм проверки выйгрышной комбинации
  - добавить подвал с показом текущего хода
  
  */

  const gameActiveHandler = () => {
    if (!chooseChip && !isGameActive) return

    if (chooseChip && !isGameActive) {
      setIsGameActive(true)
    }

    if (chooseChip && isGameActive) {
      setIsGameActive(false)
      setChooseChip(null)
    }
  }

  const chooseChipHandler = (vatiant: TVariantCell) => {
    if (chooseChip && isGameActive) return
    setChooseChip(vatiant)
  }

  return (
    <div className="app">
      <div className="container">
        <HeaderWithHero
          chooseChip={chooseChip}
          isGameActive={isGameActive}
          chooseChipHandler={chooseChipHandler}
          gameActiveHandler={gameActiveHandler}
        />
        <GameBoard isGameActive={isGameActive} />
      </div>
    </div>
  )
}

export default App
