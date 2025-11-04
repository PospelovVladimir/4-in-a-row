import { useState, type FC, useCallback, useEffect } from "react"
import "./gameBoard.scss"
import type { TVariantCell } from "../GameCell/GameCell"
import GameCell from "../GameCell/GameCell"
import GameBoardCell from "../GameBoardCell/GameBoardCell"
import { GAME_BOARD_CELL_WIDTH, GAME_BOARD_FALLING_POSITION_STEP, GAME_BOARD_START_FALLING_POSITION } from "../../config"
import type { TPlayers } from "../../types"
import { checkBoardFull, checkWin, findFinalRow, isCellInWinCombination, type TWinInfo } from "../../utils"

type TGameBoardProps = {
  rows?: number // Количество рядов
  columns?: number // Количество колонок
  isGameActive: boolean
  chooseChips: TPlayers
  isVsComputer: boolean
  boardState: TGameBoardState
  setBoardStateHandler: (state: TGameBoardState) => void
}

type TCurrentPlayersMove = {
  player1: boolean
  player2: boolean
}

export type TGameBoardState = "waiting" | "pending" | "win" | "draw"

const GameBoard: FC<TGameBoardProps> = ({
  rows = 6,
  columns = 7,
  isGameActive,
  chooseChips,
  isVsComputer,
  boardState,
  setBoardStateHandler,
}) => {
  const [grid, setGrid] = useState<(TVariantCell | null)[][]>(Array.from({ length: rows }, () => Array(columns).fill(null)))
  const [fallingStone, setFallingStone] = useState<{ column: number; color: TVariantCell } | null>(null)
  const [fallingPosition, setFallingPosition] = useState<number | null>(null)
  const [currentPlayersMove, setCurrentPlayersMove] = useState<TCurrentPlayersMove>({
    player1: true,
    player2: false,
  })
  const [winInfo, setWinInfo] = useState<TWinInfo | null>(null)

  useEffect(() => {
    if (!isGameActive) {
      setGrid(Array.from({ length: rows }, () => Array(columns).fill(null)))
    }
  }, [isGameActive])

  const placeStone = (column: number, variant: TVariantCell) => {
    const newGrid = [...grid]

    // Определяем конечную строку для падения, учитывая наличие фишек в столбце
    const finalRow = findFinalRow(newGrid, column)

    if (finalRow !== null) {
      setFallingStone({ column, color: variant })
      setFallingPosition(GAME_BOARD_START_FALLING_POSITION) // Начинаем выше экрана

      const targetPosition = finalRow * GAME_BOARD_CELL_WIDTH // Вычисляем точную целевую позицию

      // Используйте requestAnimationFrame:
      let animationFrameId: number

      const animateDrop = () => {
        setFallingPosition((prev) => {
          if (prev === null) return 0

          const newPosition = prev + GAME_BOARD_FALLING_POSITION_STEP // Двигаем вниз на 15 пикселей

          // останавливай анимацию. конечная позиция === с полетом камня
          if (newPosition >= targetPosition) {
            cancelAnimationFrame(animationFrameId) // Останавливаем анимацию
            newGrid[finalRow as number][column] = variant // Добавляем фишку в сетку
            console.log("проверка комбинаций, заполнения поля")
            const winInfo = checkWin(newGrid, 4, finalRow, column, variant, rows, columns)

            if (winInfo) {
              console.log("нашли победителя ->", winInfo)
              setWinInfo(winInfo)
            }

            if (checkBoardFull(newGrid)) {
              console.log("игра окончена ничья ->")
            }

            setGrid(newGrid)
            setFallingStone(null) // Сбрасываем падающую фишку
            return null // Убираем позицию
          }
          return newPosition
        })

        animationFrameId = requestAnimationFrame(animateDrop)
      }

      animationFrameId = requestAnimationFrame(animateDrop) // Запускаем анимацию
    }
  }

  const handlerBoardClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isGameActive || boardState === "waiting" || boardState === "win" || boardState === "draw" || fallingStone !== null) return

      const target = e.target as HTMLElement
      const gameBoardCellEl = target.closest(".game-board-cell")

      if (!gameBoardCellEl) return

      const columnIndex = gameBoardCellEl.getAttribute("data-column-index")

      if (columnIndex === null) return

      const clickedColumn = +columnIndex

      if (isNaN(clickedColumn) || clickedColumn < 0 || clickedColumn >= columns) return

      if (currentPlayersMove.player1 && chooseChips.player1) {
        console.log("user")

        placeStone(clickedColumn, chooseChips.player1)
        setCurrentPlayersMove({ ...currentPlayersMove, player1: false, player2: true })
      } else if (currentPlayersMove.player2 && chooseChips.player2 && !isVsComputer) {
        placeStone(clickedColumn, chooseChips.player2)
        setCurrentPlayersMove({ ...currentPlayersMove, player1: true, player2: false })
      }
    },
    [isGameActive, boardState, placeStone, columns, fallingStone, currentPlayersMove, chooseChips]
  )

  const makeComputerMove = useCallback(() => {
    if (
      !isGameActive ||
      boardState === "waiting" ||
      boardState === "win" ||
      boardState === "draw" ||
      fallingStone !== null ||
      !currentPlayersMove.player2 ||
      !isVsComputer
    )
      return

    console.log("pc")

    // Задержка перед ходом компьютера
    setTimeout(() => {
      // Выбираем случайный столбец
      let randomColumn: number
      do {
        randomColumn = Math.floor(Math.random() * columns)
      } while (grid[0][randomColumn] !== null) // Проверяем, что столбец не заполнен

      // Если столбец заполнен, попробуем еще раз (ограничим количество попыток, чтобы избежать бесконечного цикла)
      let attempts = 0
      while (grid[0][randomColumn] !== null && attempts < 10) {
        randomColumn = Math.floor(Math.random() * columns)
        attempts++
      }

      // Если не удалось найти свободный столбец после нескольких попыток, прекращаем
      if (grid[0][randomColumn] !== null) {
        console.warn("Не удалось найти свободный столбец для компьютера")
        return
      }

      // Ставим фишку в выбранный столбец
      if (chooseChips.player2) {
        placeStone(randomColumn, chooseChips.player2)
        setCurrentPlayersMove((prev) => ({ ...prev, player1: true, player2: false }))
      }
    }, 500) // Задержка в 500 миллисекунд (0.5 секунды)
  }, [isGameActive, boardState, fallingStone, currentPlayersMove, chooseChips, placeStone, columns, grid, isVsComputer])

  useEffect(() => {
    makeComputerMove()
  }, [makeComputerMove, currentPlayersMove])

  return (
    <div className="game-board" onClick={handlerBoardClick} style={{ opacity: isGameActive ? "1" : "0.7" }}>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div className="game-board__row" key={rowIndex}>
          {Array.from({ length: columns }).map((_, columnIndex) => {
            const cellVariant = grid[rowIndex][columnIndex]
            const isWinningCell = winInfo ? isCellInWinCombination(winInfo.winningPositions, rowIndex, columnIndex) : false

            return (
              <GameBoardCell
                key={`${rowIndex}-${columnIndex}`}
                columnIndex={columnIndex}
                cellVariant={cellVariant}
                isWinningCell={isWinningCell}
              />
            )
          })}
        </div>
      ))}

      {/* Падающая фишка */}
      {fallingStone && (
        <div
          className="game-board__falling-stone"
          style={{
            top: fallingPosition !== null ? `${fallingPosition}px` : `-${GAME_BOARD_START_FALLING_POSITION}px`, // Начальная позиция выше экрана
            left: `${fallingStone.column * GAME_BOARD_CELL_WIDTH + GAME_BOARD_CELL_WIDTH / 2}px`, // Центрирование фишки над столбцом (50px - половина ширины ячейки)
          }}
        >
          <GameCell variant={fallingStone.color} />
        </div>
      )}
    </div>
  )
}

export default GameBoard
