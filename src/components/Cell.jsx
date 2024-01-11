const Cell = ({ value, onClick }) => {
  return (
    <button
      className="w-[90px] h-[90px] p-2 m-2 border border-red-500"
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Cell;
