import { useTicTacToeLogic } from "./Gameboard";
import { useMemo } from "react";
import { TIE, PLAYER_AI, PLAYER_HUMAN } from "../../constants/initialBoard";

const TicTacToe = () => {
  const { board, isHumanNext, winner, handleClick, restartGame } =
    useTicTacToeLogic();

  const getStatusMessage = useMemo(() => {
    if (winner) {
      return winner === TIE ? "It's a tie!" : `Winner: ${winner}`;
    }
    return `Game Status: ${isHumanNext ? PLAYER_HUMAN : PLAYER_AI}`;
  }, [winner, isHumanNext]);

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
              className="border-4 border-cyan-500 hover:bg-gray-300 h-[90px] w-[90px] rounded-lg m-2 text-3xl font-bold"
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
