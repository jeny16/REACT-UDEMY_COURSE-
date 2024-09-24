import Player from "./components/players"

function App() {


  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player initialname="PLAYER 1" symbol="X"/>
          <Player initialname="PLAYER 2" symbol="O"/>
        </ol>
        GAMEBOARD
      </div>
      LOG
    </main>
  )
}

export default App
