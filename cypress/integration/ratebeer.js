import os from 'os';
import { CSVData as _CSVData } from '../../data/csvdata.js';


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
        cy.viewport(1280,1280);
        cy.visit('https://www.ratebeer.com/');
        cy.contains('Log In').click();
        cy.get('input[name=username]').type(Cypress.env('RB_USERNAME'));
        cy.get('input[name=password]').type(Cypress.env('RB_PASSWORD'));
        cy.contains('Accept All Cookies').click();
        cy.get('.auth0-label-submit').contains('Log In').click();
        cy.contains('Thanks for logging in').should('exist');
        cy.contains('Log In').should('not.exist');

        // Read CSV and add each rating in a loop
        for (const rating of _CSVData) {
            console.log(rating.link);
            cy.visit(rating.link).debug();

            cy.contains('Write a review').click();
        
            // Multiple textareas visible; correct one is with this class and aria-invalid attribute.
            // The elements in rating view can be hidden so we must use forces.
            cy.get('textarea[class^="MuiInputBase-input"][aria-invalid=false]').type(`${rating.rating} Rated on ${rating.date}.`, { force: true });

            // Sliders; rather complex nested div section
            cy.get(`div[data-testid="attribute-slider-aroma"] > ${sliderDivClass} ${sliderClasses[Number(rating.aroma) * 2]}"]`).click({ force: true });
            cy.get(`div[data-testid="attribute-slider-appearance"] > ${sliderDivClass} ${sliderClasses[Number(rating.appearance) * 4]}"]`).click({ force: true });
            cy.get(`div[data-testid="attribute-slider-flavor"] > ${sliderDivClass} ${sliderClasses[Number(rating.taste) * 2]}"]`).click({ force: true });
            cy.get(`div[data-testid="attribute-slider-mouthfeel"] > ${sliderDivClass} ${sliderClasses[Number(rating.mouthfeel) * 4]}"]`).click({ force: true });
            cy.get(`div[data-testid="attribute-slider-overall"] > ${sliderDivClass} ${sliderClasses[Number(rating.overall)]}"]`).click({ force: true });

            // Format the drink was served in
            cy.get('div[class="MuiButtonBase-root MuiChip-root mr-3 MuiChip-outlined MuiChip-clickable"] > span[class="MuiChip-label"]').contains(rating.format).click();

            // Finally, save rating
            cy.get('span').contains('Save').click();

            // Check that rating passed and write to log if not
            const divScore = Number(rating.total) / 10
            // At this point we should see a note that review has been updated
            cy.get('div').contains('Your review has been updated').should('not.exist').then((rated) => {
                cy.log(rating.link);
                cy.writeFile('data/failed.txt', `${rating.link}${os.EOL}`, { flag: 'a+' });
            })
            // And that we've already rated the product + scores
            cy.get('div').contains(`You rated this beer ${divScore.toString()}`).should('not.exist').then((rated) => {
                cy.log(rating.link);
                cy.writeFile('data/failed.txt', `${rating.link}${os.EOL}`, { flag: 'a+' });
            })
        }
    })
})
  
