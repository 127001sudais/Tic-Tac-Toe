/**
 * It should return the winner for a horizontal victory,
 * It should return the winner for a vertical victory,
 * It should return the winner for a diagonal victory,
 * It should return TIE when all squares are filled and there is no winner,
 * It should return null when the game is still ongoing.
 */

import { checkForWinner } from "../../hooks/useGameLogic";
import { TIE } from "../../constants/initialBoard";

describe("checkForWinner", () => {
  it("should return the winner for a horizontal victory", () => {
    const squares = ["X", "X", "X", null, null, null, null, null, null];
    expect(checkForWinner(squares)).toBe("X");
  });

  it("should return the winner for a vertical victory", () => {
    const squares = ["O", null, null, "O", null, null, "O", null, null];
    expect(checkForWinner(squares)).toBe("O");
  });

  it("should return the winner for a diagonal victory", () => {
    const squares = ["X", null, null, null, "X", null, null, null, "X"];
    expect(checkForWinner(squares)).toBe("X");
  });

  it("should return TIE when all squares are filled and there is no winner", () => {
    const squares = ["X", "O", "X", "X", "O", "O", "O", "X", "X"];
    expect(checkForWinner(squares)).toBe(TIE);
  });

  it("should return null when the game is still ongoing", () => {
    const squares = ["X", "O", null, null, "X", null, null, null, "O"];
    expect(checkForWinner(squares)).toBeNull();
  });
});
