describe("Tic Tac Toe End-to-End Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("plays a game where the AI wins and then restarts the game", () => {
    cy.get("[data-testid=cell-0]").first().click();
    cy.get("[data-testid=cell-0]").should("contain", "X");
    cy.get("[data-testid=cell-2]").click();
    cy.get("[data-testid=cell-2]").should("contain", "X");
    cy.get("[data-testid=cell-3]").click();
    cy.get("[data-testid=cell-3]").should("contain", "X");

    cy.get(`[data-testid=restart-button]`)
      .contains("Restart Game")
      .should("be.visible")
      .click();

    cy.get(".grid button").each((button) => {
      cy.wrap(button).should("be.empty");
    });

    cy.get("[data-testid=status-message]").should("contain", "Next move: X");
  });
});
