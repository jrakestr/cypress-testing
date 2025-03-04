import { mount } from 'cypress/react'
import './commands'

// Augment the Cypress namespace to include type definitions for
// your custom command.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

// Register the mount command 
Cypress.Commands.add('mount', mount)
