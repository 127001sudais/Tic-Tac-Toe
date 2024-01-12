import { minimax } from "../../utils/miniMax";
import {
  PLAYER_AI,
  PLAYER_HUMAN,
  initialBoard,
  TIE,
} from "../../constants/initialBoard";

// Mock the checkForWinner function to control its output during tests
jest.mock("../../constants/initialBoard", () => ({
  ...jest.requireActual("../../constants/initialBoard"),
  checkForWinner: jest.fn(),
}));

describe("minimax", () => {
  const { checkForWinner } = require("../../constants/initialBoard");

  it("should return score of 1 when AI is the winner", () => {
    const board = [
      PLAYER_AI,
      PLAYER_AI,
      PLAYER_AI,
      PLAYER_HUMAN,
      PLAYER_HUMAN,
      null,
      null,
      null,
      null,
    ];
    checkForWinner.mockReturnValue(PLAYER_AI);
    const result = minimax(board, PLAYER_AI);
    expect(result).toEqual({ score: 1 });
  });

  it("should return score of -1 when HUMAN is the winner", () => {
    const board = [
      PLAYER_HUMAN,
      PLAYER_HUMAN,
      PLAYER_HUMAN,
      PLAYER_AI,
      null,
      null,
      null,
      null,
      null,
    ];
    checkForWinner.mockReturnValue(PLAYER_HUMAN);
    const result = minimax(board, PLAYER_AI);
    expect(result).toEqual({ score: -1 });
  });

  it("should return score of 0 when there is a TIE", () => {
    const board = [
      PLAYER_AI,
      PLAYER_HUMAN,
      PLAYER_AI,
      PLAYER_AI,
      PLAYER_HUMAN,
      PLAYER_HUMAN,
      PLAYER_HUMAN,
      PLAYER_AI,
      PLAYER_AI,
    ];
    checkForWinner.mockReturnValue(TIE);
    const result = minimax(board, PLAYER_AI);
    expect(result).toEqual({ score: 0 });
  });

  it("should return the best move for AI", () => {
    const board = [
      null,
      PLAYER_HUMAN,
      PLAYER_AI,
      PLAYER_HUMAN,
      PLAYER_AI,
      null,
      null,
      null,
      null,
    ];
    checkForWinner.mockReturnValue(null); // No winner yet
    // Assume that the best move for AI is to place at index 0
    const result = minimax(board, PLAYER_AI);
    expect(result).toEqual({ index: 0, score: 1 });
  });
});
