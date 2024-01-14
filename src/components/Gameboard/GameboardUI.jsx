import { useTicTacToeLogic } from "./Gameboard";
import { useMemo } from "react";
import { TIE, PLAYER_AI, PLAYER_HUMAN } from "../../constants/initialBoard";

const TicTacToe = () => {
  const { board, isHumanNext, winner, handleClick, restartGame } =
    useTicTacToeLogic();

  // Memoized status message to avoid unnecessary recalculations.
  const getStatusMessage = useMemo(() => {
    if (winner) {
      return winner === TIE ? "It's a tie!" : `Winner: ${winner}`;
    }
    return `Next player: ${isHumanNext ? PLAYER_HUMAN : PLAYER_AI}`;
  }, [winner, isHumanNext]);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        {/* Display the game status or winner message */}
        <p className="p-2 mb-3 text-xl font-bold text-center text-white bg-gray-400 rounded-lg w-44">
          {getStatusMessage}
        </p>

        {/* Game board */}
        <div className="grid grid-cols-3 gap-2">
          {board.map((value, index) => (
            <button
              key={index}
              className="w-24 h-24 text-3xl font-bold border-4 rounded-lg border-cyan-500 hover:bg-gray-300"
              onClick={() => handleClick(index)}
              aria-label={`Cell ${index}`}
            >
              {value}
            </button>
          ))}
        </div>

        {/* Restart game button */}
        {winner && (
          <button
            onClick={restartGame}
            className="p-2 mt-3 text-xl text-white bg-red-500 rounded-lg hover:bg-red-700"
          >
            Restart Game
          </button>
        )}
      </div>
    </>
  );
};

export default TicTacToe;
