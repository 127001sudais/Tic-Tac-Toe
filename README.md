### High-Level Overview of Tic-Tac-Toe React App Technical Assignment

#### Core Functionalities:

1. **State Persistence**:
   - Implement local storage in the browser to maintain the game state even after a web app refresh.
   - Ensure state management is robust enough to recover the exact game state during the app lifecycle.

2. **Testing**:
   - Develop unit tests for individual components and utility functions to validate their expected behaviors.
   - Write end-to-end tests to simulate user interactions and game scenarios, ensuring the application works as intended from start to finish.
   - Aim for reasonable test coverage, balancing time constraints with the critical paths and functionalities.

3. **CI/CD Pipeline**:
   - Set up Continuous Integration (CI) using GitHub Actions to automatically run unit and end-to-end tests on every push or pull request.
   - Configure Continuous Deployment (CD) to deploy the application to GitHub Pages upon successful merge into the main branch.
   - Include pipeline status badges in the README for visibility.

4. **Version Control and Sharing**:
   - Maintain clear version control with meaningful commit messages and a well-organized repository structure.
   - Ensure the GitHub repository is public, with proper documentation in the README.md for setup, testing, and deployment instructions.

#### Optional Enhancements:

5. **Game Modes**:
   - Incorporate a feature to allow users to choose between Player vs Player (PvP) or Player vs Computer (PvC) modes.(use MINIMAX algorithm for the PvC and PeerJS for PvP)
   
6. **Game History**:
   - Design a system to log the outcomes of each game, including moves and winners.
   - Provide a user interface to view the history of past games, possibly with the option to replay or review them.

#### Deployment:

- **GitHub Pages**: Ensure the app is properly configured for deployment on GitHub Pages, considering path issues and SPA routing.
