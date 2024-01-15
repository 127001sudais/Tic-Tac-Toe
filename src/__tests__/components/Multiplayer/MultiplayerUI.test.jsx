import { render, fireEvent } from "@testing-library/react";
import MultiplayerUI from "../../../components/Multiplayer/MultiplayerUI";

describe("MultiplayerUI", () => {
  let props;

  beforeEach(() => {
    props = {
      board: ["", "", "", "", "", "", "", "", ""],
      makeMove: jest.fn(),
      gameOver: false,
      gameStatus: "Your Turn",
      resetGame: jest.fn(),
      isMyTurn: true,
    };
  });

  it("renders the game board", () => {
    const { getByTestId } = render(<MultiplayerUI {...props} />);
    expect(getByTestId("game-board")).toBeInTheDocument();
  });

  it("renders the game status", () => {
    const { getByText } = render(<MultiplayerUI {...props} />);
    expect(getByText("Your Turn")).toBeInTheDocument();
  });

  it("renders the reset game button when the game is over", () => {
    props.gameOver = true;
    const { getByText } = render(<MultiplayerUI {...props} />);
    expect(getByText("Reset Game")).toBeInTheDocument();
  });

  it("calls the resetGame function when the reset game button is clicked", () => {
    props.gameOver = true;
    const { getByText } = render(<MultiplayerUI {...props} />);
    const resetButton = getByText("Reset Game");
    fireEvent.click(resetButton);
    expect(props.resetGame).toHaveBeenCalledTimes(1);
  });
});
