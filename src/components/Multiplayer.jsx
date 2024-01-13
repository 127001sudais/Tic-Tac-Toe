import React, { useState, useEffect } from "react";
import { checkForWinner } from "../hooks/useGameLogic";

const Multiplayer = ({ conn }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  // Function to update the game board
  const makeMove = (position) => {
    if (gameOver || board[position]) return; // Ignore the click if the game is over or the square is already filled

    const newBoard = board.slice();
    newBoard[position] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext); // Switch the turn

    const result = checkForWinner(newBoard);
    if (result) {
      setGameOver(true);
      // Handle the game over condition (e.g., displaying a message)
    }

    // Here you would also send the move to the peer
    if (conn) {
      conn.send({ position, value: newBoard[position] });
    }
  };

  // Function to receive moves from the peer
  const handleReceiveMove = (data) => {
    const { position, value } = data;
    const newBoard = board.slice();
    newBoard[position] = value;
    setBoard(newBoard);
    setIsXNext(value !== "X");

    const result = checkForWinner(newBoard);
    if (result) {
      setGameOver(true);
      // Handle the game over condition (e.g., displaying a message)
    }
  };

  useEffect(() => {
    if (conn) {
      // Listen for data/messages from the peer
      conn.on("data", handleReceiveMove);

      // Handle the connection closing
      conn.on("close", () => {
        console.log("Connection has been closed");
        // Handle the connection close (e.g., clean up or alert the user)
      });
    }

    // Cleanup listener on unmount
    return () => {
      if (conn) {
        conn.off("data", handleReceiveMove);
        conn.off("close");
      }
    };
  }, [conn, board]);

  // Render the game board
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Multiplayer Game</h1>
      <div className="grid grid-cols-3">
        {board.map((value, index) => (
          <div
            key={index}
            className="border m-2 p-2 w-[90px] h-[90px]"
            onClick={() => makeMove(index)}
          >
            {value}
          </div>
        ))}
      </div>
      {gameOver && (
        <div className="game-over">
          {/* Display the winner or if it's a tie */}
        </div>
      )}
    </div>
  );
};

export default Multiplayer;
