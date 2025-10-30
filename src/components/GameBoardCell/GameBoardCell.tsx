import { memo, type FC } from "react"
import "./gameBoardCell.scss"
import type { TVariantCell } from "../GameCell/GameCell"
import GameCell from "../GameCell/GameCell"

type TGameBoardCell = {
  columnIndex: number
  cellVariant: TVariantCell | null
  handlerClick: (columnIndex: number) => void
}

const GameBoardCell: FC<TGameBoardCell> = memo(({ columnIndex, cellVariant, handlerClick }) => {
  return (
    <div className="game-board-cell" onClick={() => handlerClick(columnIndex)}>
      {cellVariant && <GameCell variant={cellVariant as TVariantCell} />}
    </div>
  )
})

export default GameBoardCell
