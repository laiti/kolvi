import csv from 'csv-parser';
const fs = require('data/ratebeer.js');

// TEMP: Variables from CSV
const format = 'Can';
const aroma = 1;
const appearance = 2;
const flavor = 3;
const mouthfeel = 4;
const overall = 5;

const rbdata = fs.createReadStream('data/ratebeer.csv');

// Slider classes
const sliderClasses = {
    0: 'hRiarj',
    1: 'dBWBq',
    2: 'kEsWct',
    3: 'ibtkUr',
    4: 'kqPTBY',
    5: 'fjDdZP',
    6: 'cXmNnE',
    7: 'eHBGGW',
    8: 'hAbJBB',
    9: 'fWvzMO',
   10: 'jHIuhD',
}

const sliderDivClass = 'div > div[class="Slider___StyledDiv-kfCDlB dxmuNj"] > div > div > div[class="Slider__Tick-gLnXwE Slider___StyledTick-dNReAI';

describe('Login to Ratebeer and post rating', () => {
    it('Login to Ratebeer', () => {
        cy.visit('https://ratebeer.com/');
        cy.contains('Log In').click();
        cy.get('input[name=username]').type(Cypress.env('RB_USERNAME'));
        cy.get('input[name=password]').type(Cypress.env('RB_PASSWORD'));
        cy.contains('Accept All Cookies').click();
        cy.get('.auth0-label-submit').contains('Log In').click();
        cy.contains('Log In').should('not.exist');

        // Read CSV and add each rating in a loop
        rbdata.pipe(csv()).on('data', (rating) => {

            cy.visit(`https://ratebeer.com/beer/pfriem-vienna-lager/479195/`);
            cy.contains('Write a review').click();
        
            // Multiple textareas visible; correct one is with this class and aria-invalid attribute.
            // The elements in rating view can be hidden so we must use force.
            cy.get('textarea[class^="MuiInputBase-input"][aria-invalid=false]').type('foo', { force: true });

            // Sliders; rather complex nested div section
            cy.get(`div[data-testid="attribute-slider-aroma"] > ${sliderDivClass} ${sliderClasses[aroma]}"]`).click({ force: true });
            cy.get(`div[data-testid="attribute-slider-appearance"] > ${sliderDivClass} ${sliderClasses[appearance]}"]`).click({ force: true });
            cy.get(`div[data-testid="attribute-slider-flavor"] > ${sliderDivClass} ${sliderClasses[flavor]}"]`).click({ force: true });
            cy.get(`div[data-testid="attribute-slider-mouthfeel"] > ${sliderDivClass} ${sliderClasses[mouthfeel]}"]`).click({ force: true });
            cy.get(`div[data-testid="attribute-slider-overall"] > ${sliderDivClass} ${sliderClasses[overall]}"]`).click({ force: true });

            // Format the drink was served in
            cy.get('span').contains(format).click({ force: true });
            // cy.get('span').contains('Save').click();
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
        });
            
    })
})
  
