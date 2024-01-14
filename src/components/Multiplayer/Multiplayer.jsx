import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MultiplayerUI from "./MultiplayerUI";
import { checkForWinner } from "../../hooks/useGameLogic";

/**
 * Multiplayer component manages the state and logic for a multiplayer game session.
 * It uses a connection object passed as a prop to communicate with the other player.
 *
 * Props:
 *   conn (object): A connection object that supports sending and receiving data,
 *                  and handling disconnections with the methods: send, on, off.
 */
const Multiplayer = ({ conn }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [gameStatus, setGameStatus] = useState("Player X's turn");

  // Function to reset the game to its initial state.
  const resetGame = () => {
    if (gameOver && conn) {
      setBoard(Array(9).fill(null));
      setIsXNext(true);
      setGameOver(false);
      setGameStatus("Player X's turn");
      conn.send({ type: "reset" });
    }
  };

  // Effect hook to set up event listeners for receiving data and handling disconnection.
  useEffect(() => {
    const handleReceiveMove = (data) => {
      if (data.type === "reset") {
        resetGame();
        return;
      }

      const { position, value } = data;
      if (positionIsValid(position) && !gameOver) {
        updateBoard(position, value);
      }
    };

    const handleConnectionClose = () => {
      setGameStatus("⚠️ Opponent disconnected.");
      setGameOver(true);
    };

    if (conn) {
      conn.on("data", handleReceiveMove);
      conn.on("close", handleConnectionClose);
    }

    // Cleanup function to remove event listeners.
    return () => {
      if (conn) {
        conn.off("data", handleReceiveMove);
        conn.off("close", handleConnectionClose);
      }
    };
  }, [conn, board, gameOver]);

  // Validates if the chosen position is valid for a move.
  const positionIsValid = (position) => {
    return position >= 0 && position < board.length && board[position] === null;
  };

  // Updates the game status message based on the current state of the game.
  const updateGameStatus = (newBoard) => {
    const winner = checkForWinner(newBoard);
    if (winner) {
      setGameOver(true);
      setGameStatus(`Player ${winner} wins!`);
    } else if (isBoardFull(newBoard)) {
      setGameOver(true);
      setGameStatus("It's a draw!");
    } else {
      setGameStatus(`Player ${isXNext ? "O" : "X"}'s turn`);
    }
  };

  // Checks if the board is full without a winner.
  const isBoardFull = (newBoard) => {
    return newBoard.every((cell) => cell !== null);
  };

  // Updates the board with the new move and toggles the turn.
  const updateBoard = (position, value) => {
    const newBoard = [...board];
    newBoard[position] = value;
    setBoard(newBoard);
    setIsXNext(!isXNext);
    updateGameStatus(newBoard);
  };

  // Function to handle making a move on the board.
  const makeMove = (position) => {
    if (board[position] || gameOver) return;
    const nextValue = isXNext ? "X" : "O";
    updateBoard(position, nextValue);

    // Send the move to the other player.
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

// PropType validation for the connection object.
Multiplayer.propTypes = {
  conn: PropTypes.shape({
    send: PropTypes.func.isRequired,
    on: PropTypes.func.isRequired,
    off: PropTypes.func.isRequired,
  }),
};

export default Multiplayer;
