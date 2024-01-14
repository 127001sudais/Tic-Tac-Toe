import React, { useState, useEffect } from "react";
import MultiplayerUI from "./MultiplayerUI";
import { checkForWinner } from "../../hooks/useGameLogic";

const Multiplayer = ({ conn }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [gameStatus, setGameStatus] = useState("Player X's turn");

  const resetGame = () => {
    if (gameOver) {
      setBoard(Array(9).fill(null));
      setIsXNext(true);
      setGameOver(false);
      setGameStatus("Player X's turn");
      if (conn) {
        conn.send({ type: "reset" });
      }
      console.log("game resetted");
    }
  };

  useEffect(() => {
    const handleReceiveMove = (data) => {
      if (data.type === "reset") {
        resetGame();
        return;
      }

      const { position, value } = data;
      if (board[position] === null && !gameOver) {
        updateBoard(position, value);
      }
    };

    if (conn) {
      conn.on("data", handleReceiveMove);
      conn.on("close", () => console.log("Connection has been closed."));
    }

    return () => {
      if (conn) {
        conn.off("data", handleReceiveMove);
        conn.off("close");
      }
    };
  }, [conn, board, gameOver]);

  const updateGameStatus = (newBoard) => {
    const winner = checkForWinner(newBoard);
    if (winner) {
      setGameOver(true);
      setGameStatus(`Player ${winner} wins!`);
    } else if (!newBoard.includes(null)) {
      setGameOver(true);
      setGameStatus("It's a draw!");
    } else {
      setGameStatus(`Player ${isXNext ? "O" : "X"}'s turn`);
    }
  };

  const updateBoard = (position, value) => {
    const newBoard = [...board];
    newBoard[position] = value;
    setBoard(newBoard);
    setIsXNext(!isXNext);
    updateGameStatus(newBoard);
  };

  const makeMove = (position) => {
    if (board[position] || gameOver) return;
    const nextValue = isXNext ? "X" : "O";
    updateBoard(position, nextValue);

    if (conn) {
      conn.send({ position, value: nextValue });
    }
  };

  return (
    <MultiplayerUI
      board={board}
      makeMove={makeMove}
      gameOver={gameOver}
      gameStatus={gameStatus}
      resetGame={resetGame}
    />
  );
};

export default Multiplayer;
