import { TIE } from "../constants/initialBoard";

/**
 * Check the current state of the board for a winner.
 *
 * @param {Array} squares - An array representing the state of the board. Each element corresponds to a square which can be 'X', 'O', or null.
 * @returns {string|null} - Returns 'X' or 'O' if a winner is found, 'TIE' if there's a tie, or null if the game is still ongoing.
 */
export const checkForWinner = (squares) => {
  // Define all possible winning combinations on the board
  const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6], // Diagonal from top-right to bottom-left
  ];

  // Iterate through all winning combinations to check if any combination is met
  for (const [a, b, c] of winningCombinations) {
    // Check if the squares for a winning combination are all the same and not null
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Return the winner ('X' or 'O')
    }
  }

  // If all squares are filled and no winner, return 'TIE', otherwise return null for an ongoing game
  return squares.every(Boolean) ? TIE : null;
};
