import React, { useState, useEffect } from "react";
import MultiplayerUI from "./MultiplayerUI";
import { checkForWinner } from "../../hooks/useGameLogic";

const Multiplayer = ({ conn }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const makeMove = (position) => {
    if (gameOver || board[position]) return;

    const newBoard = board.slice();
    newBoard[position] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const result = checkForWinner(newBoard);
    if (result) {
      setGameOver(true);
    }

    if (conn) {
      conn.send({ position, value: newBoard[position] });
    }
  };

  const handleReceiveMove = (data) => {
    const { position, value } = data;
    const newBoard = board.slice();
    newBoard[position] = value;
    setBoard(newBoard);
    setIsXNext(value !== "X");

    const result = checkForWinner(newBoard);
    if (result) {
      setGameOver(true);
    }
  };

  useEffect(() => {
    if (conn) {
      conn.on("data", handleReceiveMove);
      conn.on("close", () => console.log("Connection has been closed"));
    }

    return () => {
      if (conn) {
        conn.off("data", handleReceiveMove);
        conn.off("close");
      }
    };
  }, [conn, board]);

  return (
    <MultiplayerUI board={board} makeMove={makeMove} gameOver={gameOver} />
  );
};

export default Multiplayer;
