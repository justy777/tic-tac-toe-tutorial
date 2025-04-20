export function calculateWinner(squares) {
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const isWinningLine = (a, b, c) => {
        return squares[a] && squares[a] === squares[b] && squares[a] === squares[c];
    }
  
    for (const [a, b, c] of winningPatterns) {
      if (isWinningLine(a, b, c)) {
        return squares[a];
      }
    }

    return null;
  }
  