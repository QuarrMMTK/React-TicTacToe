import React from 'react'
import './TicTacToe.css'

const winConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

export const TicTacToe = () => {

  let [board, setBoard] = React.useState(Array(9).fill(""));
  let [isXNext, setIsXNext] = React.useState(true);
  let [winner, setWinner] = React.useState(null);

  const checkWinner = (newBoard) => {
    for (let condition of winConditions) {
      const [a ,b ,c ] = condition;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return newBoard[a];
      }
    }
    return null;
  }

  const handleClick = (index) => {
    if (board[index] || winner) {
      return;
    }
    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);

    const win = checkWinner(newBoard);
    if (win) {
      setWinner(win);
    } else if (newBoard.every(cell => cell)) {
      setWinner("Draw");
    } else {
      setIsXNext(!isXNext);
    }
  };

  const handleReset = () => {
    setBoard(Array(9).fill(""));
    setIsXNext(true);
    setWinner(null);
  }

  return (
    <>
    <div className="container">
      <h1 className="title">Tic Tac Toe in <span>React</span></h1>
      <div className="status">
        {winner ? (winner === "Draw" ? "It's a Draw!" : `Winner: ${winner}`) : `Next Player: ${isXNext ? "X" : "O"}`}
      </div>
      <div className="board">
        {[0, 1, 2].map(row => (
          <div className={`row${row+1}`} key = {row}>
            {[0, 1, 2].map(col => {
              const index = row * 3 + col;
              return (
                <div 
                  className="cell" 
                  key={col} 
                  onClick={() => handleClick(index)}
                >
                  {board[index]}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <button className='reset' onClick={handleReset}>Reset</button>
    </div>
    </>
  );
}
