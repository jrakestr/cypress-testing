# Tech Quiz with Cypress Testing

A full-stack MERN application for taking technical quizzes with comprehensive test coverage using Cypress for both component and end-to-end testing.

![Tech Quiz Application](https://github.com/jrakestr/cypress-testing/raw/main/assets/demo.gif)

## Description

This application is a Tech Quiz platform built with the MERN stack (MongoDB, Express.js, React, Node.js) and TypeScript. It features:

- A React front-end with TypeScript
- A Node.js/Express.js back-end API
- MongoDB database integration
- Cypress testing for both components and end-to-end functionality

The application allows users to:
- Start a new quiz
- Answer multiple choice questions
- View their final score upon completion
- Start a new quiz after completion

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jrakestr/cypress-testing.git
   cd cypress-testing
   ```

2. Install dependencies:
   ```bash
   # Install root dependencies
   npm install
   
   # Install client dependencies
   cd client
   npm install
   cd ..
   
   # Install server dependencies
   cd server
   npm install
   cd ..
   ```

3. Set up environment variables:
   ```bash
   # In the server directory
   cp .env.EXAMPLE .env
   ```
   Update the MongoDB connection string in the .env file.

4. Seed the database:
   ```bash
   cd server
   npm run seed
   ```

## Usage

1. Start the development servers:
   ```bash
   # In the root directory
   npm run dev
   ```

   This will concurrently start both the frontend and backend servers.

2. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## Testing

The application uses Cypress for both component and end-to-end testing. 

1. Run tests:
   ```bash
   # In the root directory
   npm run test
   ```

2. Open Cypress for interactive testing:
   ```bash
   # In the root directory
   npx cypress open
   ```

### Test Coverage

The test suite includes:

- **Component Tests**: Tests for the Quiz component in isolation
  - Initial rendering of the start button
  - Quiz starting after clicking the start button
  - Question and answer display
  - Progression through questions
  - Score display and restart functionality

- **End-to-End Tests**: Tests for the full application flow
  - Application loading and initial rendering
  - Quiz start button functionality
  - Question progression with answer selection
  - Final score display
  - Starting a new quiz after completion

## Project Structure

```
.
├── client/                   # React frontend application
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── models/           # TypeScript interfaces
│   │   └── services/         # API service functions
│   └── package.json
│
├── cypress/                  # Cypress tests
│   ├── component/            # Component tests
│   │   └── Quiz.cy.tsx       # Quiz component tests
│   ├── e2e/                  # End-to-end tests
│   │   └── quiz.cy.js        # Quiz application flow tests
│   └── fixtures/             # Test data
│       └── questions.json    # Mock questions
│
├── server/                   # Express backend
│   ├── src/
│   │   ├── config/           # Database connection
│   │   ├── controllers/      # Route controllers
│   │   ├── models/           # MongoDB models
│   │   ├── routes/           # API routes
│   │   └── seeds/            # Database seed data
│   └── package.json
│
├── cypress.config.ts         # Cypress configuration
└── package.json              # Root package.json
```

## Technologies Used

- **Frontend**:
  - React with TypeScript
  - Vite for building
  - Fetch API for data fetching

- **Backend**:
  - Node.js with Express
  - MongoDB with Mongoose
  - TypeScript

- **Testing**:
  - Cypress for component and E2E testing
  - Cypress fixtures for mock data

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

---
© 2024 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.
