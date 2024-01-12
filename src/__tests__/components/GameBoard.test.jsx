import { render, fireEvent, cleanup, screen } from "@testing-library/react";
import TicTacToe from "../../components/GameBoard";
import { PLAYER_HUMAN } from "../../constants/initialBoard";

describe("TicTacToe Game", () => {
  let getByText;
  let queryByText;
  let getAllByRole;
  let getByRole;

  beforeEach(() => {
    ({ getByText, queryByText, getAllByRole, getByRole } = render(
      <TicTacToe />
    ));
  });

  afterEach(cleanup);

  it("should display the correct initial status message", () => {
    expect(getByText(`Game Status: ${PLAYER_HUMAN}`)).toBeInTheDocument();
  });

  it("should restart the game and reset the board and status message", () => {
    const buttons = getAllByRole("button");
    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);
    fireEvent.click(buttons[2]);
    fireEvent.click(buttons[4]);
    fireEvent.click(buttons[3]);

    const restartButton = getByText("Restart Game");
    expect(restartButton).toBeInTheDocument();
    fireEvent.click(restartButton);

    expect(getByText(`Game Status: ${PLAYER_HUMAN}`)).toBeInTheDocument();
    buttons.slice(0, 9).forEach((button) => {
      expect(button).toHaveTextContent("");
    });
  });

  it("should check if clicking on a non-empty cell does not change the board", () => {
    const buttons = getAllByRole("button");
    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[0]);
    expect(buttons[0]).toHaveTextContent(PLAYER_HUMAN);
  });
});
