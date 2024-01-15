import { useTicTacToeLogic } from "./Gameboard";
import { useMemo } from "react";
import { TIE, PLAYER_AI, PLAYER_HUMAN } from "../../constants/initialBoard";

const TicTacToe = () => {
  const { board, isHumanNext, winner, handleClick, restartGame } =
    useTicTacToeLogic();

  const statusMessage = useMemo(() => {
    if (winner) {
      return winner === TIE ? "It's a tie!" : `Winner: ${winner}`;
    }
    return `Next move: ${isHumanNext ? PLAYER_HUMAN : PLAYER_AI}`;
  }, [winner, isHumanNext]);

  return (
    <>
      <div className="relative flex flex-col items-center justify-center">
        {/* Status Message */}
        <p
          data-testid="status-message"
          className="p-2 mb-4 text-3xl font-bold text-center text-white bg-gray-400 rounded-lg status-message"
        >
          {statusMessage}
        </p>

        {/* Game Board */}
        <div className="grid grid-cols-3 gap-2">
          {board.map((value, index) => (
            <button
              data-testid={`cell-${index}`}
              key={index}
              className="w-24 h-24 text-3xl font-bold border-4 rounded-lg border-cyan-500 hover:bg-gray-300"
              onClick={() => handleClick(index)}
              aria-label={`Cell ${index}`}
            >
              {value}
            </button>
          ))}
        </div>

        {/* Restart Game Button */}
        {winner && (
          <button
            data-testid="restart-button"
            onClick={restartGame}
            className="absolute p-2 mt-3 text-xl text-white bg-red-500 rounded-lg top-96 hover:bg-red-700"
          >
            Restart Game
          </button>
        )}
      </div>
    </>
  );
};

export default TicTacToe;
