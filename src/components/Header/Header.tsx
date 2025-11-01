import GameCell from "../GameCell/GameCell"
import { Button } from "../UI/Button/Button"
import "./header.scss"

const Header = () => {
  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__left">player1</div>
        <div className="header__center">
          <span className="header__text">Choose a chip:</span>
          <div className="header__chip-list">
            <div className="header__chip-list-item active" data-color="blue">
              <GameCell variant="blue" />
            </div>
            <div className="header__chip-list-item active" data-color="green">
              <GameCell variant="green" />
            </div>
            <div className="header__chip-list-item active" data-color="red">
              <GameCell variant="red" />
            </div>
            <div className="header__chip-list-item active" data-color="violet">
              <GameCell variant="violet" />
            </div>
          </div>
          <Button variant="primary" handler={() => {}}>
            start game
          </Button>
        </div>
        <div className="header__right">player2</div>
      </div>
    </header>
  )
}

export default Header
