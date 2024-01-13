import React from "react";

const Multiplayer = () => {
  // This represents the initial state of the board with all empty cells
  const initialBoardState = Array(9).fill(null);

  return (
    <div className="game-board">
      <div className="grid grid-cols-3">
        {initialBoardState.map((value, index) => (
          <div
            key={index}
            className="board-cell border-4 border-red-500 h-[90px] w-[90px] rounded-lg m-2 text-3xl flex justify-center items-center"
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Multiplayer;
