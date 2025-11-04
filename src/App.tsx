import { useState } from "react"
import "./App.scss"
import GameBoard, { type TGameBoardState } from "./components/GameBoard/GameBoard"
import HeaderWithHero from "./components/HeaderWithHero/HeaderWithHero"
import type { TVariantCell } from "./components/GameCell/GameCell"
import { chooseChipExcludingSelected } from "./utils"
import type { TPlayers } from "./types"

export type TCurrentPlayersMove = {
  player1: boolean
  player2: boolean
}

const App = () => {
  const [isGameActive, setIsGameActive] = useState(false)
  const [chooseChips, setChooseChips] = useState<TPlayers>({ player1: null, player2: null })
  const [isVsComputer, setIsVsComputer] = useState(true)
  /*  
  'waiting' игра не началась, 
  'pending', игра в процессе, 
  'win', есть победа какого-то игрока, 
  'draw',  ничья. */
  const [boardState, setBoardState] = useState<TGameBoardState>("waiting")
  const [currentPlayersMove, setCurrentPlayersMove] = useState<TCurrentPlayersMove>({
    player1: true,
    player2: false,
  })

  const setBoardStateHandler = (state: TGameBoardState) => {
    setBoardState(state)
  }

  /* 
  
  TODO
  + добавить функцию выбора фишки компьютером после выбора фишки игроком
  + передавать выбранные фишки в гейм поле (1 фишка это игрок)
  + убрать генерацию фишек рандомно с игрового поля
  + добавить алгоритм хода компьютером после хода игрока (возможно с задержкой)
      предусмотреть невозможность хода игроком пока ходит компьютер
  - убрать баг при клике на заполненый столбец, фишка не добавляется, но ход переходит к следующему игроку
      поставить проверку чтобы дело не доходило до placeStone (надо сохранить ход, если игрок жмет на переполненнй столбец)
  + добавить алгоритм проверки выйгрышной комбинации
  - добавить подвал с показом текущего хода
  - убрать баг в игре против пк: если найдена выигрышная комбинация, пк после нее ходить не должен, а там срабатыывает доп ход
      вероятно проблема в состояниях. (на момент срабатывания пк логики, он не получает свежее состояние доски)
  
  */

  const gameActiveHandler = () => {
    if (!chooseChips.player1 && !isGameActive) return

    if (chooseChips.player1 && !isGameActive) {
      setIsGameActive(true)
      setBoardState("pending")
    }

    if (chooseChips.player1 && isGameActive) {
      setIsGameActive(false)
      setBoardState("waiting")
      setChooseChips({ player1: null, player2: null })
    }
  }

  const chooseChipHandler = (vatiant: TVariantCell) => {
    if (chooseChips.player1 && isGameActive) return
    const colors: TVariantCell[] = ["red", "blue", "green", "violet"]
    setChooseChips({ ...chooseChips, player1: vatiant, player2: chooseChipExcludingSelected(colors, vatiant) })
  }

  return (
    <div className="app">
      <div className="container">
        <HeaderWithHero
          chooseChip={chooseChips.player1}
          chooseChips={chooseChips}
          isGameActive={isGameActive}
          chooseChipHandler={chooseChipHandler}
          gameActiveHandler={gameActiveHandler}
          currentPlayersMove={currentPlayersMove}
        />
        <GameBoard
          isGameActive={isGameActive}
          chooseChips={chooseChips}
          isVsComputer={isVsComputer}
          boardState={boardState}
          setBoardStateHandler={setBoardStateHandler}
          currentPlayersMove={currentPlayersMove}
          setCurrentPlayersMove={setCurrentPlayersMove}
        />
      </div>
    </div>
  )
}

export default App
