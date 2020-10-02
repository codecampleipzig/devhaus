// https://docs.cypress.io/api/introduction/api.html

describe('Test Cypress', () => {
  it('Visits the app root url and gets redirected', () => {
    cy.visit('/');
    cy.location('pathname').should('eq', '/auth/signin');
    cy.get('h1').contains('DEVHAUS');
  });
});
