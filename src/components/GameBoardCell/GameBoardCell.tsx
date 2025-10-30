import { memo, type FC } from "react"
import "./gameBoardCell.scss"
import type { TVariantCell } from "../GameCell/GameCell"
import GameCell from "../GameCell/GameCell"

type TGameBoardCell = {
  columnIndex: number
  cellVariant: TVariantCell | null
}

const GameBoardCell: FC<TGameBoardCell> = memo(({ cellVariant }) => {
  return <div className="game-board-cell">{cellVariant && <GameCell variant={cellVariant as TVariantCell} />}</div>
})

export default GameBoardCell
