import {
  initialBoard,
  PLAYER_AI,
  PLAYER_HUMAN,
  TIE,
} from "../constants/initialBoard";

// Check for a winner or a tie
export const checkForWinner = (squares) => {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of winningCombinations) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return squares.every(Boolean) ? TIE : null;
};
