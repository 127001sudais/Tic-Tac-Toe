import React from "react";
import PropTypes from "prop-types";

const Cell = ({ value, onClick }) => (
  <button
    type="button"
    className="w-24 h-24 p-2 text-3xl font-bold border-4 border-green-500 rounded-lg hover:bg-gray-300"
    onClick={onClick}
    aria-label={`Cell ${value || "empty"}`}
    tabIndex={0}
  >
    {value}
  </button>
);

Cell.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

const MultiplayerUI = ({
  board,
  makeMove,
  gameOver,
  gameStatus,
  resetGame,
}) => (
  <div className="relative flex flex-col items-center justify-center">
    <div className="grid grid-cols-3 gap-2">
      {board.map((value, index) => (
        <Cell
          key={`cell-${index}`}
          value={value}
          onClick={() => makeMove(index)}
        />
      ))}
    </div>
    {gameOver && (
      <>
        <p className="absolute p-2 m-2 text-xl font-bold text-center text-white bg-gray-400 rounded-lg top-80 w-44">
          {gameStatus}
        </p>
        <button
          type="button"
          className="absolute p-2 m-2 text-xl font-bold text-white bg-red-500 rounded-lg w-44"
          onClick={resetGame}
        >
          Reset Game
        </button>
      </>
    )}
  </div>
);

MultiplayerUI.propTypes = {
  board: PropTypes.arrayOf(PropTypes.string).isRequired,
  makeMove: PropTypes.func.isRequired,
  gameOver: PropTypes.bool.isRequired,
  gameStatus: PropTypes.string.isRequired,
  resetGame: PropTypes.func.isRequired,
};

export default MultiplayerUI;
