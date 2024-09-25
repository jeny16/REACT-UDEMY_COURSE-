const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  
  export default function GameBoard({ onSelectSquare, gameBoard }) {
    return (
      <ol id="game-board">
        {gameBoard.map((row, rowIndex) => (
          <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol, colIndex) => (
                <li key={colIndex}>
                  <button
                    onClick={() => onSelectSquare(rowIndex, colIndex)}
                    disabled={playerSymbol !== null} // Disable button if already played
                  >
                    {playerSymbol ? playerSymbol : " "} 
                  </button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    );
  }
  