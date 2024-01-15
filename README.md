# App Navigation Guide

This project is hosted on GitHub Pages. To view the live application, please [click here](https://127001sudais.github.io/Tic-Tac-Toe/).

## Home Page Overview

1. The application is designed as a single-page application to ensure seamless user interaction.
2. The default game mode is "Player vs. AI," which uses a robust minimax algorithm for challenging gameplay. This mode features state-saving within the browser to maintain game progress.
3. A multiplayer mode is also available, enabled through PeerJS for real-time player connections.

## Gameplay Instructions

### Single Player Mode

- Upon accessing the site, the game is ready to play. You will play as Player `X`, and the AI will be Player `O`. The AI operates with an unbeatable strategy.

### Multiplayer Mode

- To play in multiplayer mode, open two separate browser tabs and navigate to the Multiplayer section.
- Wait for your PeerID to generate. Then, copy your ID and paste it into the PeerID field on the second tab.
- Press the "Connect" button on both tabs to start the multiplayer session.

## Continuous Integration and Deployment (CI/CD)

This project is equipped with a robust CI/CD pipeline that ensures code quality and facilitates automatic deployment. The pipeline includes:

- **Automated Builds**: Each commit triggers an automated build process, verifying that the application compiles successfully.
- **Cypress End-to-End Testing**: Cypress is integrated to perform end-to-end testing, simulating user interactions to ensure all features behave as expected.
- **Jest Testing**: Jest is used for unit and integration tests to validate the logic and functionality of individual components.
- **Automated Deployment**: Upon successful testing, changes are automatically deployed to GitHub Pages, ensuring that the latest version is always available to users.

## Development Setup

### Prerequisites

- Node.js (the Long Term Support version is recommended for stability)
- A modern web browser that is compatible with contemporary web standards

### Installation Steps

1. Clone the repository to your local machine using `git clone <repository-url>`.
2. Run `npm install` in your terminal to install all the necessary dependencies.

### Running the Application

- Launch the application in development mode by executing `npm start` in your terminal.