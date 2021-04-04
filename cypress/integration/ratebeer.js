describe('My First Test', () => {
    it('Login to Ratebeer', () => {
        cy.visit('https://ratebeer.com/')
        cy.contains('Log In').click();
        cy.get('input[name=username]').type(Cypress.env('RB_USERNAME'));
        cy.get('input[name=password]').type(Cypress.env('RB_PASSWORD'));
        cy.contains('Accept All Cookies').click();
        cy.get('.auth0-label-submit').contains('Log In').click();
    })
})
  
