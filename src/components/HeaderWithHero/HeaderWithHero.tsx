import "./headerWithHero.scss"
import hero2 from "../../assets/images/hero2.png"
import { Button } from "../UI/Button/Button"
import GameCell from "../GameCell/GameCell"

const HeaderWithHero = () => {
  return (
    <div className="header-with-hero">
      <div className="header-with-hero__img-wrapper">
        <img className="header-with-hero__img" src={hero2} alt="" />
      </div>
      <div className="header-with-hero__center-wrapper">
        <div className="header-with-hero__center">
          <span className="header-with-hero__text">Choose a chip:</span>
          <div className="header-with-hero__chip-list">
            <div className="header-with-hero__chip-list-item active" data-color="blue">
              <GameCell variant="blue" />
            </div>
            <div className="header-with-hero__chip-list-item active" data-color="green">
              <GameCell variant="green" />
            </div>
            <div className="header-with-hero__chip-list-item active" data-color="red">
              <GameCell variant="red" />
            </div>
            <div className="header-with-hero__chip-list-item active" data-color="violet">
              <GameCell variant="violet" />
            </div>
          </div>
          <Button variant="primary" handler={() => {}}>
            start game
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HeaderWithHero
