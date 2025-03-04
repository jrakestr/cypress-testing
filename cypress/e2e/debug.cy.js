describe('Debug Test', () => {
  it('should show page content', () => {
    cy.visit('/', { 
      timeout: 30000,
      retryOnStatusCodeFailure: true,
      retryOnNetworkFailure: true
    })
    
    // Log the entire HTML content of the page
    cy.document().then((doc) => {
      cy.log('Page HTML:')
      cy.log(doc.body.innerHTML)
    })
    
    // Try to find any elements on the page
    cy.get('body').then(($body) => {
      cy.log('Body exists:', $body.length > 0)
      cy.log('Body content:', $body.html())
      
      // Log all buttons on the page
      cy.log('Buttons found:', $body.find('button').length)
      cy.log('Button content:', $body.find('button').map((i, el) => el.textContent).get().join(', '))
      
      // Log div elements to see if the app container exists
      cy.log('Divs found:', $body.find('div').length)
      
      // Try with longer timeouts
      cy.wait(5000) // Wait 5 seconds to see if content loads later
      cy.log('After wait - Buttons found:', $body.find('button').length)
    })
  })
}) 