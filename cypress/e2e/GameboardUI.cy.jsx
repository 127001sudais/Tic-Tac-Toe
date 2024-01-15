describe("Tic Tac Toe End-to-End Tests", () => {
  beforeEach(() => {
    // Adjust this to the path where your Tic Tac Toe game is served
    cy.visit("http://localhost:3000/");
  });

  it("plays a game where the AI wins and then restarts the game", () => {
    // Human plays on the first cell as "X"
    cy.get("[data-testid=cell-0]").first().click();
    cy.get("[data-testid=cell-0]").should("contain", "X");
    cy.get("[data-testid=cell-2]").click();
    cy.get("[data-testid=cell-2]").should("contain", "X");
    cy.get("[data-testid=cell-3]").click();
    cy.get("[data-testid=cell-3]").should("contain", "X");

    // Check if the restart button is visible and click it
    cy.get(`[data-testid=restart-button]`)
      .contains("Restart Game")
      .should("be.visible")
      .click();

    // Confirm the game has restarted by checking the board is cleared
    cy.get(".grid button").each((button) => {
      cy.wrap(button).should("be.empty");
    });

    // Confirm the status message has reset
    cy.get("[data-testid=status-message]").should("contain", "Next move: X");
  });
});
