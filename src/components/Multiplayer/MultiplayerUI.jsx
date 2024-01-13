const MultiplayerUI = ({ board, makeMove, gameOver }) => (
  <div className="flex flex-col items-center justify-center">
    <h1>Multiplayer Game</h1>
    <div className="grid grid-cols-3">
      {board.map((value, index) => (
        <div
          key={index}
          className="border-2 border-green-500 m-2 p-2 w-[90px] h-[90px] rounded-lg items-center justify-center flex "
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

export default MultiplayerUI;
