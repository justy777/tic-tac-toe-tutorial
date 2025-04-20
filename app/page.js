"use client";

import { useState } from "react";
import { calculateWinner } from "../lib/game";

const BOARD_SIZE = 3;

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Row({ rowIndex, squares, onSquareClick }) {
  const rowSquares = [...Array(BOARD_SIZE)].map((_, colIndex) => {
    const index = rowIndex * BOARD_SIZE + colIndex;
    return (
        <Square
          key={index}
          value={squares[index]}
          onSquareClick={() => onSquareClick(index)}
        />
    );
  });

  return <div className="board-row">{rowSquares}</div>;
}

function Board({ xIsNext, squares, onPlay }) {
  function handleSquareClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const rows = [...Array(BOARD_SIZE)].map((_, rowIndex) => (
      <Row key={rowIndex} rowIndex={rowIndex} squares={squares} onSquareClick={handleSquareClick} />
  ));

  return (
    <>
      <div className="status">{status}</div>
      {rows}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
