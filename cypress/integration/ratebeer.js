describe('My First Test', () => {
    it('Does not do much!', () => {
        cy.visit('https://ratebeer.com')
        cy.contains('Log In').click();
        cy.get('input[name=username]').type('Hello, World');
        cy.get('input[name=password]').type('Hello, World');
        cy.contains('Accept All Cookies').click();
        cy.get('#auth0-label-submit').click();
    })
  })
  