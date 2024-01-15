import React from "react";
import PropTypes from "prop-types";

// Cell component for individual cells of the game board
const Cell = ({ value, onClick, isClickable }) => (
  <button
    type="button"
    className="w-24 h-24 p-2 text-3xl font-bold border-4 border-green-500 rounded-lg hover:bg-gray-300"
    onClick={onClick}
    disabled={!isClickable}
    aria-label={`Cell ${value || "empty"}`}
    tabIndex={0}
  >
    {value}
  </button>
);

// Define PropTypes for Cell to ensure proper usage
Cell.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  isClickable: PropTypes.bool.isRequired,
};

// MultiplayerUI component for the game interface
const MultiplayerUI = ({
  board,
  makeMove,
  gameOver,
  gameStatus,
  resetGame,
  isMyTurn,
}) => (
  <div className="relative flex flex-col items-center justify-center">
    <p className="p-2 mb-4 text-3xl font-semibold text-white bg-gray-400 rounded-lg">
      {gameStatus}
    </p>

    <div className="grid grid-cols-3 gap-2">
      {board.map((value, index) => (
        <Cell
          key={`cell-${index}`}
          value={value}
          onClick={() => makeMove(index)}
          isClickable={!gameOver && isMyTurn}
        />
      ))}
    </div>
    {gameOver && (
      <button
        type="button"
        className="absolute p-2 m-2 text-xl font-bold text-white bg-red-500 rounded-lg hover:bg-red-700 top-96 w-44"
        onClick={resetGame}
      >
        Reset Game
      </button>
    )}
  </div>
);

// Define PropTypes for MultiplayerUI to ensure proper usage
MultiplayerUI.propTypes = {
  board: PropTypes.arrayOf(PropTypes.string).isRequired,
  makeMove: PropTypes.func.isRequired,
  gameOver: PropTypes.bool.isRequired,
  gameStatus: PropTypes.string.isRequired,
  resetGame: PropTypes.func.isRequired,
  isMyTurn: PropTypes.bool.isRequired,
};

export default MultiplayerUI;
