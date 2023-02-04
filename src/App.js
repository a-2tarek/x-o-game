import { useState } from "react";

function Square({ value, squareClick }) {
  return (
    <>
      <button className="square" onClick={squareClick}>
        {value}
      </button>
    </>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [nextIsx, setNextIsx] = useState(true);

  const handleClick = (i) => {
    if (squares[i] || winner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    if (nextIsx) {
      nextSquares[i] = "x";
    } else {
      nextSquares[i] = "o";
    }
    setNextIsx(!nextIsx);
    setSquares(nextSquares);
  };
  const winnerName = winner(squares);
  let status;

  if (winnerName) {
    status = "winner is :" + winnerName;
  } else {
    status = "next player is " + (nextIsx ? "x" : "o");
  }

  function winner(square) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (square[a] && square[a] === square[b] && square[b] === square[c]) {
        return square[b];
      }
    }
    return null;
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} squareClick={() => handleClick(0)} />
        <Square value={squares[1]} squareClick={() => handleClick(1)} />
        <Square value={squares[2]} squareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} squareClick={() => handleClick(3)} />
        <Square value={squares[4]} squareClick={() => handleClick(4)} />
        <Square value={squares[5]} squareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} squareClick={() => handleClick(6)} />
        <Square value={squares[7]} squareClick={() => handleClick(7)} />
        <Square value={squares[8]} squareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
