import React from "react";
import { mount } from "@cypress/react18";
import App from "../../src/App";

// Start your test suite
describe("App", () => {
  it("renders the navigation and main content", () => {
    mount(<App />);

    cy.get('[data-testid="app-navigation"]').should("exist");
    cy.get('[data-testid="nav-ul"]').should("exist");
    cy.get('[data-testid="nav-ul-li"]').should("have.length", 2);
    cy.get('[data-testid="nav-ul-li"]')
      .first()
      .should("have.class", "selected");
    cy.get('[data-testid="app-main"]').should("exist");
  });

  it("can navigate between tabs", () => {
    mount(<App />);

    cy.get('[data-testid="nav-ul-li"]').eq(1).scrollIntoView();
    cy.wait(500);
    cy.get('[data-testid="nav-ul-li"]').eq(1).click({ force: true });
  });
});
