import { memo, type FC } from "react"
import "./gameBoardCell.scss"
import type { TVariantCell } from "../GameCell/GameCell"
import GameCell from "../GameCell/GameCell"

type TGameBoardCell = {
  columnIndex: number
  cellVariant: TVariantCell | null
  isWinningCell: boolean
}

const GameBoardCell: FC<TGameBoardCell> = memo(({ cellVariant, columnIndex, isWinningCell }) => {
  return (
    <div className="game-board-cell" data-column-index={columnIndex}>
      {cellVariant && <GameCell variant={cellVariant as TVariantCell} isWinningCell={isWinningCell} />}
    </div>
  )
})

export default GameBoardCell
