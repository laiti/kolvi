import csv from 'csv-parser';
const CSVData = require('../../data/csvdata.js');

// TEMP: Variables from CSV
const format = 'Can';
const aroma = 1;
const appearance = 2;
const flavor = 3;
const mouthfeel = 4;
const overall = 5;

// Slider classes
const sliderClasses = {
    0: 'hRiarj',
    1: 'cvIRpx',
    2: 'dBWBq',
    3: 'dntIqb',
    4: 'kEsWct',
    5: 'fXCPLY',
    6: 'ibtkUr',
    7: 'oFseU',
    8: 'kqPTBY',
    9: 'ywDJh',
    10: 'fjDdZP',
    11: 'fIZvXG',
    12: 'cXmNnE',
    13: 'kpsOiU',
    14: 'eHBGGW',
    15: 'bEiHuf',
    16: 'hAbJBB',
    17: 'fTdEjy',
    18: 'fWvzMO',
    19: 'eamjUa',
    20: 'jHIuhD',
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
        for (const rating of CSVData.CSVData) {
            console.log(rating.link);
            cy.visit(rating.link).debug();
            cy.contains('Write a review').click();
        
            // Multiple textareas visible; correct one is with this class and aria-invalid attribute.
            // The elements in rating view can be hidden so we must use force.
            cy.get('textarea[class^="MuiInputBase-input"][aria-invalid=false]').type(`${rating.rating} Rated on ${rating.date}.`, { force: true });

            // Sliders; rather complex nested div section
            cy.get(`div[data-testid="attribute-slider-aroma"] > ${sliderDivClass} ${sliderClasses[rating.aroma]}"]`).click({ force: true });
            cy.get(`div[data-testid="attribute-slider-appearance"] > ${sliderDivClass} ${sliderClasses[rating.appearance * 2]}"]`).click({ force: true });
            cy.get(`div[data-testid="attribute-slider-flavor"] > ${sliderDivClass} ${sliderClasses[rating.flavor]}"]`).click({ force: true });
            cy.get(`div[data-testid="attribute-slider-mouthfeel"] > ${sliderDivClass} ${sliderClasses[rating.mouthfeel * 2]}"]`).click({ force: true });
            cy.get(`div[data-testid="attribute-slider-overall"] > ${sliderDivClass} ${sliderClasses[rating.overall]}"]`).click({ force: true });

            // Format the drink was served in
            cy.get('span').contains(rating.format).click({ force: true });
            // cy.get('span').contains('Save').click();
        }    
    })
})
  
