describe("TicTacToe and MLobby App", () => {
  beforeEach(() => {
    // Start from the index page
    cy.visit("https://127001sudais.github.io/Tic-Tac-Toe/");
  });

  it("renders navigation tabs", () => {
    cy.get("nav ul li").should("have.length", 2);
    cy.get("nav ul li").first().should("contain", "🤖 AI(miniMAX)");
    cy.get("nav ul li").last().should("contain", "🤼 MultiPlayer");
  });

  it("starts with the AI(miniMAX) tab selected", () => {
    cy.get("nav ul li").first().should("have.class", "selected");
    cy.get("nav ul li.selected .underline").should("exist");
  });

  it("displays the TicTacToe component by default", () => {
    cy.get(".window main").should("contain", "Next move:");
  });
});
