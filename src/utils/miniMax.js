import {
  initialBoard,
  PLAYER_AI,
  PLAYER_HUMAN,
  TIE,
  GAME_STATE_KEY,
} from "../constants/initialBoard";
import { checkForWinner } from "../hooks/useGameLogic";

export const minimax = (board, player) => {
  const winner = checkForWinner(board);
  if (winner)
    return {
      score: winner === PLAYER_AI ? 1 : winner === PLAYER_HUMAN ? -1 : 0,
    };

  let bestScore = player === PLAYER_AI ? -Infinity : Infinity;
  let bestMove = null;

  board.forEach((square, index) => {
    if (!square) {
      const newBoard = [...board];
      newBoard[index] = player;

      const { score } = minimax(
        newBoard,
        player === PLAYER_HUMAN ? PLAYER_AI : PLAYER_HUMAN
      );

      if (
        (player === PLAYER_AI && score > bestScore) ||
        (player === PLAYER_HUMAN && score < bestScore)
      ) {
        bestScore = score;
        bestMove = { index, score };
      }
    }
  });

  return bestMove || { score: 0 };
};
