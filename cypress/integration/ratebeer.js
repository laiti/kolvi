const RBURL = 'https://ratebeer.com';

// Variables from CSV
const format = 'Bottle';

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
        // Multiple textareas visible; correct one is with this class and aria-invalid attribute.
        // The elements in rating view can be hidden so we must use force.
        cy.get('textarea[class^="MuiInputBase-input"][aria-invalid=false]').type('foo', { force: true });

        // Sliders; must use nth-child
        cy.get('div[class="Slider__Tick-gLnXwE Slider___StyledTick-dNReAI eHBGGW"]').click({ force: true });

        // Format the drink was served in
        cy.contains(format).click({ force: true });
        // cy.contains('Save').click();
    })
})
  
