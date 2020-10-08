// https://docs.cypress.io/api/introduction/api.html

// Clicking through the navbar
describe("Nav", () => {
  it("Signs in, clicks on Calendar, clicks on Member, clicks on Profile, clicks on Home", () => {
    // SignIn
    cy.visit("/auth/signin");
    cy.location("pathname").should("eq", "/auth/signin");
    cy.get("form").within(() => {
      cy.get("input[placeholder=Email]").type("cypress@test.com");
      cy.get("input[placeholder=Password]").type("Lotte123");
      cy.get("input[type=submit]").click();
    });
    // Navbar
    // Calendar
    cy.get("nav")
      .contains("Events")
      .click();
    cy.location("pathname").should("eq", "/view-events/all-events");
    // Members
    cy.get("nav")
      .contains("Members")
      .click();
    cy.location("pathname").should("eq", "/members");

    // Home
    cy.get("nav")
      .contains("News")
      .click();
    cy.location("pathname").should("eq", "/news");
  });
});
