import { useState, type FC, useCallback, useEffect } from "react"
import "./gameBoard.scss"
import type { TVariantCell } from "../GameCell/GameCell"
import GameCell from "../GameCell/GameCell"
import GameBoardCell from "../GameBoardCell/GameBoardCell"
import { GAME_BOARD_CELL_WIDTH, GAME_BOARD_FALLING_POSITION_STEP, GAME_BOARD_START_FALLING_POSITION } from "../../config"

type TGameBoardProps = {
  rows?: number // Количество рядов
  columns?: number // Количество колонок
  isGameActive: boolean
}

const GameBoard: FC<TGameBoardProps> = ({ rows = 6, columns = 7, isGameActive }) => {
  const [grid, setGrid] = useState<(TVariantCell | null)[][]>(Array.from({ length: rows }, () => Array(columns).fill(null)))

  const [fallingStone, setFallingStone] = useState<{ column: number; color: TVariantCell } | null>(null)
  const [fallingPosition, setFallingPosition] = useState<number | null>(null)

  useEffect(() => {
    if (!isGameActive) {
      setGrid(Array.from({ length: rows }, () => Array(columns).fill(null)))
    }
  }, [isGameActive])

  const placeStone = (column: number, variant: TVariantCell) => {
    const newGrid = [...grid]

    // Определяем конечную строку для падения, учитывая наличие фишек в столбце
    let finalRow: number | null = null

    for (let row = 0; row < rows; row++) {
      if (newGrid[row][column] === null) {
        finalRow = row // Находим первую доступную ячейку для добавления фишки
      } else {
        break // Если ячейка занята, прекращаем поиск
      }
    }

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

  const handleBoardClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isGameActive || fallingStone !== null) return

      const boardRect = e.currentTarget.getBoundingClientRect()
      const clickX = e.clientX - boardRect.left

      // Вычисляем, в какой столбец был клик
      const clickedColumn = Math.floor(clickX / GAME_BOARD_CELL_WIDTH) // GAME_BOARD_CELL_WIDTH - ширина ячейки

      // Проверяем, что клик был в пределах допустимых столбцов
      if (clickedColumn >= 0 && clickedColumn < columns) {
        const colors: TVariantCell[] = ["red", "blue", "green", "violet"]
        const randomColor = colors[Math.floor(Math.random() * colors.length)]
        placeStone(clickedColumn, randomColor)
      }
    },
    [placeStone, columns, fallingStone]
  )

  return (
    <div className="game-board" onClick={handleBoardClick} style={{ opacity: isGameActive ? "1" : "0.7" }}>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div className="game-board__row" key={rowIndex}>
          {Array.from({ length: columns }).map((_, columnIndex) => {
            const cellVariant = grid[rowIndex][columnIndex]
            return <GameBoardCell key={`${rowIndex}-${columnIndex}`} columnIndex={columnIndex} cellVariant={cellVariant} />
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
