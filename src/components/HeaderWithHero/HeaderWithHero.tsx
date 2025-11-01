import "./headerWithHero.scss"
import hero2 from "../../assets/images/hero2.png"
import { Button } from "../UI/Button/Button"
import GameCell, { type TVariantCell } from "../GameCell/GameCell"
import type { FC } from "react"

type THeaderWithHero = {
  chooseChip: TVariantCell | null
  isGameActive: boolean
  gameActiveHandler: () => void
  chooseChipHandler: (vatiant: TVariantCell) => void
}

const HeaderWithHero: FC<THeaderWithHero> = ({ chooseChip, isGameActive, gameActiveHandler, chooseChipHandler }) => {
  return (
    <div className="header-with-hero">
      <div className="header-with-hero__img-wrapper">
        <img className="header-with-hero__img" src={hero2} alt="" />
      </div>
      <div className="header-with-hero__center-wrapper">
        <div className="header-with-hero__center">
          <span className="header-with-hero__text">Choose a chip:</span>
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
          <Button variant="primary" handler={gameActiveHandler} disabled={!chooseChip}>
            {isGameActive ? "finish game" : "start game"}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HeaderWithHero
