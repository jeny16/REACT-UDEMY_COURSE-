import { useState } from "react";
import GameBoard from "./components/gameBoard";
import Player from "./components/players";
import GameOver from "./components/gameOver.jsx";
import Log from "./components/log";
import { WINNING_COMBINATIONS } from "./winning-combination.js";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  return gameTurns.length % 2 === 0 ? 'X' : 'O'; 
}

function deriveGameBoardFromTurns(gameTurns) {
  const board = initialGameBoard.map(row => row.slice());

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    board[row][col] = player; 
  }
  
  return board;
}

function App() {
  const [players, setPlayers] = useState({
    X : 'Player 1', 
    O : 'Player 2'  
  })
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoardFromTurns(gameTurns);
  let winner; 

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol]; 
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, columnIndex) {
    if (gameBoard[rowIndex][columnIndex] !== null || winner) return;

    setGameTurns(prevTurns => [
      {
        square: { row: rowIndex, col: columnIndex },
        player: activePlayer,
      },
      ...prevTurns,
    ]);
  }

  function handleRestart(){
    setGameTurns([]);
  }  

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayer => {
      return{
        ...prevPlayer,
        [symbol] : newName
      };
    });

  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialname="PLAYER 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
            
          />
          <Player
            initialname="PLAYER 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          
          />
        </ol>
        { (winner || hasDraw) && <GameOver winner = {winner} onRestart={handleRestart}/> } 
        <GameBoard 
            onSelectSquare={handleSelectSquare} 
            gameBoard={gameBoard} /> 
      </div>
      <div>
        <h3>Game Log</h3>
        <Log turns={gameTurns} />
      </div>
    </main>
  );
}

export default App;
