import { PLAYER_AI, PLAYER_HUMAN, TIE } from "../constants/initialBoard";
import { checkForWinner } from "../hooks/useGameLogic";

/**
 * The minimax algorithm to determine the best move for a player.
 *
 * @param {Array} board - The current state of the game board, an array of squares.
 * @param {string} player - The current player (either PLAYER_AI or PLAYER_HUMAN).
 * @returns {Object} - The best move for the current player and the associated score.
 */
export const minimax = (board, player) => {
  // First, check if the game is over and return the appropriate score.
  const winner = checkForWinner(board);
  if (winner) {
    // If there's a winner, score the board according to who has won.
    return {
      score: winner === PLAYER_AI ? 1 : winner === PLAYER_HUMAN ? -1 : 0,
    };
  }

  // Initialize the best score: negative infinity for AI (maximizing player), positive infinity for human (minimizing player).
  let bestScore = player === PLAYER_AI ? -Infinity : Infinity;
  let bestMove = null;

  // Iterate over all squares of the board.
  board.forEach((square, index) => {
    if (!square) {
      // Check if the square is empty.
      const newBoard = [...board]; // Create a new board configuration.
      newBoard[index] = player; // Make a move on the new board.

      // Recursively call minimax, switching the player.
      const { score } = minimax(
        newBoard,
        player === PLAYER_HUMAN ? PLAYER_AI : PLAYER_HUMAN
      );

      // If the new score is better than the best score, update bestScore and bestMove.
      if (
        (player === PLAYER_AI && score > bestScore) ||
        (player === PLAYER_HUMAN && score < bestScore)
      ) {
        bestScore = score;
        bestMove = { index, score }; // Store the index and score of the best move.
      }
    }
  });

  // If there's no best move, return a score of 0; otherwise, return the best move found.
  return bestMove || { score: 0 };
};
