import { mount } from "@cypress/react18";
import TicTacToe from "../../src/components/Gameboard/GameboardUI";
import * as hooks from "../../src/components/Gameboard/Gameboard";
import React from "react";

describe("TicTacToe Component", () => {
  const mockUseTicTacToeLogic = {
    board: Array(9).fill(null),
    isHumanNext: true,
    winner: null,
    handleClick: () => {},
    restartGame: () => {},
  };

  beforeEach(() => {
    cy.stub(hooks, "useTicTacToeLogic").returns(mockUseTicTacToeLogic);

    mount(<TicTacToe />);
  });

  it("shhould display the correct status message", () => {
    cy.get('[data-testid="status-message"]').contains("Next move: X");
  });

  it("allows cells to be clicked", () => {
    cy.get('[data-testid="cell-0"]').click();
    cy.get('[data-testid="cell-0"]').contains("X");
  });

  describe("when the game is over", () => {
    it("should display the winner message", () => {
      cy.get('[data-testid="cell-0"]').click();
      cy.get('[data-testid="cell-2"]').click();
      cy.get('[data-testid="cell-3"]').click();
      cy.get('[data-testid="status-message"]').contains("Winner: O");
    });

    it("should display the restart button when game is over", () => {
      cy.get('[data-testid="cell-0"]').click();
      cy.get('[data-testid="cell-2"]').click();
      cy.get('[data-testid="cell-3"]').click();
      cy.get('[data-testid="restart-button"]').contains("Restart Game");
    });

    it("should restart the game", () => {
      cy.get('[data-testid="cell-0"]').click();
      cy.get('[data-testid="cell-2"]').click();
      cy.get('[data-testid="cell-3"]').click();
      cy.get('[data-testid="restart-button"]').click();
      cy.get('[data-testid="status-message"]').should("not.contain", "Winner:");
      cy.get('[data-testid^="cell-"]').each(($cell) => {
        cy.wrap($cell).should("be.empty");
      });
    });
  });
});
