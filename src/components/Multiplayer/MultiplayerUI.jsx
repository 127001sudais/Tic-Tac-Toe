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
        <p className="bg-gray-400 w-44 p-2 m-2 rounded-lg text-white font-bold text-xl text-center">
          {gameStatus}
        </p>
        <button
          className="bg-red-500 w-44 p-2 m-2 text-white rounded-lg font-bold text-xl"
          onClick={resetGame}
        >
          Reset Game
        </button>
      </>
    )}
  </div>
);

export default MultiplayerUI;
