import "./App.scss"
import GameBoard from "./components/GameBoard/GameBoard"
import Header from "./components/Header/Header"

const App = () => {
  return (
    <div className="app">
      <div className="container">
        <Header />
        <GameBoard />
      </div>
    </div>
  )
}

export default App
