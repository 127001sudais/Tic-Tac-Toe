import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  PLAYER_HUMAN,
  PLAYER_AI,
  TIE,
  initialBoard,
} from "../constants/initialBoard";
import { checkForWinner } from "../hooks/useGameLogic";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { minimax } from "../utils/miniMax";

const TicTacToe = () => {
  const [board, setBoard] = useLocalStorage("board", initialBoard);
  const [isHumanNext, setIsHumanNext] = useLocalStorage("isHumanNext", true);
  const winner = useMemo(() => checkForWinner(board), [board]);

  const handleClick = useCallback(
    (index) => {
      if (board[index] || winner) return;
      const newBoard = [...board];
      newBoard[index] = isHumanNext ? PLAYER_HUMAN : PLAYER_AI;
      setBoard(newBoard);
      setIsHumanNext(!isHumanNext);
    },
    [board, winner, isHumanNext, setBoard, setIsHumanNext]
  );

  useEffect(() => {
    if (!isHumanNext && !winner) {
      const move = minimax(board, PLAYER_AI).index;
      if (move !== undefined) {
        handleClick(move);
      }
    }
  }, [board, isHumanNext, winner, handleClick]);

  /**
   *
   */
  const getStatusMessage = useMemo(() => {
    if (winner) {
      return winner === TIE ? "It's a tie!" : `Winner: ${winner}`;
    }
    return `Game Status: ${isHumanNext ? PLAYER_HUMAN : PLAYER_AI}`;
  }, [winner, isHumanNext]);

  const restartGame = () => {
    setBoard(initialBoard);
    setIsHumanNext(true);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <p className="text-center bg-gray-400 w-44 p-2 mb-3 rounded-lg text-white font-bold text-xl">
          {getStatusMessage}
        </p>
        <div className="grid grid-cols-3">
          {board.map((value, index) => (
            <button
              key={index}
              className="border-4 border-red-500 hover:bg-gray-300 h-[90px] w-[90px] rounded-lg m-2 text-3xl font-semibold"
              onClick={() => handleClick(index)}
            >
              {value}
            </button>
          ))}
        </div>
        {winner && (
          <button
            onClick={restartGame}
            className="bg-red-500 hover:bg-red-800 rounded-lg m-2 p-2 text-xl text-white"
          >
            Restart Game
          </button>
        )}
      </div>
    </>
  );
};

export default TicTacToe;
