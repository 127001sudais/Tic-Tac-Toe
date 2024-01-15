const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // Assuming your e2e tests are in cypress/e2e
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  component: {
    // Assuming your component tests are in cypress/component
    specPattern: "cypress/component/**/*.cy.{js,jsx,ts,tsx}",
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
