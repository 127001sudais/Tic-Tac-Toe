import { render, fireEvent, screen } from "@testing-library/react";
import TicTacToe from "../../../components/Gameboard/GameboardUI";
import { useTicTacToeLogic } from "../../../components/Gameboard/Gameboard";

jest.mock("../../../components/Gameboard/Gameboard", () => ({
  useTicTacToeLogic: jest.fn(),
}));

describe("<TicTacToe />", () => {
  const mockRestartGame = jest.fn();
  const mockHandleClick = jest.fn();

  beforeEach(() => {
    mockRestartGame.mockClear();
    mockHandleClick.mockClear();

    useTicTacToeLogic.mockReturnValue({
      board: Array(9).fill(null), // empty board
      isHumanNext: true,
      winner: null,
      handleClick: mockHandleClick,
      restartGame: mockRestartGame,
    });
  });

  test("renders the component correctly", () => {
    render(<TicTacToe />);
    expect(screen.getByTestId("status-message")).toHaveTextContent(
      "Next move: X"
    );
    // Check if all cells are rendered
    for (let i = 0; i < 9; i++) {
      expect(screen.getByTestId(`cell-${i}`)).toBeInTheDocument();
    }
  });

  test("restarts the game when clicked on restart button", () => {
    useTicTacToeLogic.mockReturnValue({
      ...useTicTacToeLogic(),
      winner: "Human",
    });
    render(<TicTacToe />);
    fireEvent.click(screen.getByTestId("restart-button"));
    expect(mockRestartGame).toHaveBeenCalled();
  });

  test("clicks on the cell when a move is made by player", () => {
    const cellIndex = 0;
    render(<TicTacToe />);
    fireEvent.click(screen.getByTestId(`cell-${cellIndex}`));
    expect(mockHandleClick).toHaveBeenCalledWith(cellIndex);
  });
});
