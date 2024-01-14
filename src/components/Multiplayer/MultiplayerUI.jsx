const MultiplayerUI = ({
  board,
  makeMove,
  gameOver,
  gameStatus,
  resetGame,
}) => (
  <div className="flex flex-col items-center justify-center">
    <div className="grid grid-cols-3">
      {board.map((value, index) => (
        <div
          key={index}
          className="border-4 border-green-500 m-2 p-2 w-[90px] h-[90px] rounded-lg flex items-center justify-center font-bold text-3xl"
          onClick={() => makeMove(index)}
        >
          {value}
        </div>
      ))}
    </div>
    {gameOver && (
      <>
        <p className="p-2 m-2 text-xl font-bold text-center text-white bg-gray-400 rounded-lg w-44">
          {gameStatus}
        </p>
        <button
          className="p-2 m-2 text-xl font-bold text-white bg-red-500 rounded-lg w-44"
          onClick={resetGame}
        >
          Reset Game
        </button>
      </>
    )}
  </div>
);

export default MultiplayerUI;
