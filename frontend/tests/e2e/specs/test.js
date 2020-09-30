// https://docs.cypress.io/api/introduction/api.html

describe('Test Cypress', () => {
  it('Visits the app root url and gets redirected', () => {
    cy.visit('/');
    cy.location('pathname').should('eq', '/auth/signin');
    cy.get('h1').contains('Sign In');
  });
});

describe('Can log in', () => {
  it('Authenticates a user log in', () => {
    cy.visit('/auth/signin', { auth: { email: 'test@test.com', password: '123456' } });
  });
});
