/// <reference types="cypress" />
import React from 'react'
import Quiz from '../../client/src/components/Quiz'
import * as questionApi from '../../client/src/services/questionApi'

// cypress/react provides mount command at runtime, we don't need to import it

describe('Quiz Component Tests', () => {
  beforeEach(() => {
    // For ES Modules, we need to use a different approach
    // Instead of direct assignment, we'll stub the window.fetch that the API uses
    cy.intercept('GET', '/api/questions/random', {
      statusCode: 200,
      fixture: 'questions.json'
    }).as('getQuestions');
  })

  it('should show the start button initially', () => {
    cy.mount(<Quiz />)
    // Use longer timeout and retry until visible
    cy.get('button', { timeout: 10000 }).contains('Start Quiz').should('be.visible')
  })

  it('should start the quiz when the start button is clicked', () => {
    cy.mount(<Quiz />)
    cy.get('button').contains('Start Quiz').click()
    
    // Quiz should be loading or showing questions - use longer timeout
    cy.get('h2', { timeout: 10000 }).should('exist')
  })

  it('should display a question with multiple answers', () => {
    cy.mount(<Quiz />)
    cy.get('button').contains('Start Quiz').click()
    
    // Wait for questions to load with longer timeout
    cy.get('h2', { timeout: 10000 }).should('exist')
    cy.get('.alert', { timeout: 10000 }).should('have.length.at.least', 2) 
  })

  it('should progress through questions when answering', () => {
    cy.mount(<Quiz />)
    cy.get('button').contains('Start Quiz').click({ force: true })
    
    // Wait for questions to load with longer timeout
    cy.get('h2', { timeout: 15000 }).should('be.visible')
    
    // Get the total number of questions from our fixture
    cy.fixture('questions.json').then((questions) => {
      // Click through all questions
      cy.wrap([...Array(questions.length).keys()]).each((_, index) => {
        cy.log(`Answering question ${index + 1}/${questions.length}`)
        
        // Click the first answer option with force true for reliability
        cy.get('.btn.btn-primary').first()
          .should('be.visible')
          .click({ force: true })
        
        // Add a small delay to ensure UI updates
        cy.wait(500)
      })
      
      // Verify we reached the completion page
      cy.get('h2', { timeout: 15000 })
        .should('be.visible')
        .should('contain', 'Quiz Completed')
    })
  })

  it('should show the quiz results after answering all questions', () => {
    cy.mount(<Quiz />)
    cy.get('button').contains('Start Quiz').click()
    
    // Click through all questions (our fixture has 3 questions)
    cy.wrap([0, 1, 2]).each(() => {
      // Make sure buttons are visible before clicking
      cy.get('.btn.btn-primary', { timeout: 10000 }).first().should('be.visible').click()
    })
    
    // Should show the completion screen with longer timeout
    cy.get('h2', { timeout: 10000 }).contains('Quiz Completed').should('be.visible')
    cy.get('.alert.alert-success', { timeout: 10000 }).should('be.visible')
    cy.get('button', { timeout: 10000 }).contains('Take New Quiz').should('be.visible')
  })

  it('should allow starting a new quiz after completion', () => {
    cy.mount(<Quiz />)
    cy.get('button').contains('Start Quiz').click()
    
    // Click through all questions with better error handling
    cy.wrap([0, 1, 2]).each(() => {
      cy.get('.btn.btn-primary', { timeout: 10000 }).first().should('be.visible').click()
    })
    
    // Start a new quiz with better waiting
    cy.get('button', { timeout: 10000 }).contains('Take New Quiz').should('be.visible').click()
    
    // Should show questions again
    cy.get('h2', { timeout: 10000 }).should('exist')
    cy.get('.alert', { timeout: 10000 }).should('have.length.at.least', 2)
  })
}) 