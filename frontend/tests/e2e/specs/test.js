// https://docs.cypress.io/api/introduction/api.html

describe('Test Cypress', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.get('h1').contains('Hello DevHaus');
  });
});
