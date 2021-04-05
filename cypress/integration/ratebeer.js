const RBURL = 'https://ratebeer.com';

describe('Login to Ratebeer and post rating', () => {
    it('Login to Ratebeer', () => {
        cy.visit(RBURL)
        cy.contains('Log In').click();
        cy.get('input[name=username]').type(Cypress.env('RB_USERNAME'));
        cy.get('input[name=password]').type(Cypress.env('RB_PASSWORD'));
        cy.contains('Accept All Cookies').click();
        cy.get('.auth0-label-submit').contains('Log In').click();
        cy.contains('Log In').should('not.exist');

        cy.visit(`${RBURL}/beer/pfriem-vienna-lager/479195/`);
        cy.contains('Write a review').click();
        // Multiple textareas visible; correct one is with this class and aria-invalid attribute. Hidden in
        // CSS so we must use force.
        cy.get('textarea[class^="MuiInputBase-input"][aria-invalid=false]').type('foo', { force: true });
    })
})
  
