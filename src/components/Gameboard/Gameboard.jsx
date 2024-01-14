import { useCallback, useEffect, useMemo } from "react";
import {
  PLAYER_HUMAN,
  PLAYER_AI,
  initialBoard,
} from "../../constants/initialBoard";
import { checkForWinner } from "../../hooks/useGameLogic";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { minimax } from "../../utils/miniMax";

export const useTicTacToeLogic = () => {
  // State management for board and turn via local storage.
  const [board, setBoard] = useLocalStorage("board", initialBoard);
  const [isHumanNext, setIsHumanNext] = useLocalStorage("isHumanNext", true);

  // Memoize to only recompute winner when 'board' changes.
  const winner = useMemo(() => checkForWinner(board), [board]);

  // Handle the click event on the game board.
  const handleClick = useCallback(
    (index) => {
      // Early return if the cell is already filled or if the game is over.
      if (board[index] || winner) return;

      // Create a new board array with the newly placed marker.
      const newBoard = [...board];
      newBoard[index] = isHumanNext ? PLAYER_HUMAN : PLAYER_AI;

      // Update the board and toggle the turn.
      setBoard(newBoard);
      setIsHumanNext(!isHumanNext);
    },
    [board, winner, isHumanNext]
  );

  // AI logic to perform a move when it's the AI's turn.
  useEffect(() => {
    const makeAIMove = async () => {
      if (!isHumanNext && !winner) {
        const move = minimax(board, PLAYER_AI).index;
        if (typeof move !== "undefined") {
          handleClick(move);
        }
      }
    };

    makeAIMove();
  }, [board, isHumanNext, winner, handleClick]);

  // Function to restart the game and reset the state.
  const restartGame = () => {
    setBoard(initialBoard);
    setIsHumanNext(true);
  };

  return {
    board,
    isHumanNext,
    winner,
    handleClick,
    restartGame,
  };
};
