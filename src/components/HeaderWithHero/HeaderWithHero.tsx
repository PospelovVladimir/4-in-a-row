import "./headerWithHero.scss"
import hero2 from "../../assets/images/hero2.png"
import { Button } from "../UI/Button/Button"
import GameCell, { type TVariantCell } from "../GameCell/GameCell"
import type { FC } from "react"
import type { TPlayers } from "../../types"
import type { TCurrentPlayersMove } from "../../App"

type THeaderWithHero = {
  chooseChip: TVariantCell | null
  chooseChips: TPlayers
  isGameActive: boolean
  gameActiveHandler: () => void
  chooseChipHandler: (vatiant: TVariantCell) => void
  currentPlayersMove: TCurrentPlayersMove
}

const HeaderWithHero: FC<THeaderWithHero> = ({
  chooseChip,
  chooseChips,
  isGameActive,
  gameActiveHandler,
  chooseChipHandler,
  currentPlayersMove,
}) => {
  return (
    <div className="header-with-hero">
      <div className="header-with-hero__img-wrapper">
        <img className="header-with-hero__img" src={hero2} alt="" />
      </div>
      <div className="header-with-hero__center-wrapper">
        <div className="header-with-hero__center">
          {!isGameActive && <span className="header-with-hero__text">Choose a chip:</span>}
          {!isGameActive && (
            <div className="header-with-hero__chip-list">
              <div
                className={`header-with-hero__chip-list-item ${chooseChip === "blue" ? "active" : ""}`}
                onClick={() => chooseChipHandler("blue")}
                data-color="blue"
              >
                <GameCell variant="blue" />
              </div>
              <div
                className={`header-with-hero__chip-list-item ${chooseChip === "green" ? "active" : ""}`}
                onClick={() => chooseChipHandler("green")}
                data-color="green"
              >
                <GameCell variant="green" />
              </div>
              <div
                className={`header-with-hero__chip-list-item ${chooseChip === "red" ? "active" : ""}`}
                onClick={() => chooseChipHandler("red")}
                data-color="red"
              >
                <GameCell variant="red" />
              </div>
              <div
                className={`header-with-hero__chip-list-item ${chooseChip === "violet" ? "active" : ""}`}
                onClick={() => chooseChipHandler("violet")}
                data-color="violet"
              >
                <GameCell variant="violet" />
              </div>
            </div>
          )}

          {isGameActive && chooseChips.player1 !== null && chooseChips.player2 !== null && (
            <div className="header-with-hero__chip-list">
              <div
                className={`header-with-hero__chip-list-item ${currentPlayersMove.player1 ? "active" : ""}`}
                data-color={chooseChips.player1}
              >
                <GameCell variant={chooseChips.player1} />
              </div>
              <div
                className={`header-with-hero__chip-list-item ${currentPlayersMove.player2 ? "active" : ""}`}
                data-color={chooseChips.player2}
              >
                <GameCell variant={chooseChips.player2} />
              </div>
            </div>
          )}

          <Button variant="primary" handler={gameActiveHandler} disabled={!chooseChip}>
            {isGameActive ? "restart game" : "start game"}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HeaderWithHero
