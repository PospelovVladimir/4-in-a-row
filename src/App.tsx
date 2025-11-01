import "./App.scss"
import GameBoard from "./components/GameBoard/GameBoard"
import Header from "./components/Header/Header"
import HeaderWithHero from "./components/HeaderWithHero/HeaderWithHero"

const App = () => {
  return (
    <div className="app">
      <div className="container">
        {/* <Header /> */}
        <HeaderWithHero />
        <GameBoard />
      </div>
    </div>
  )
}

export default App
