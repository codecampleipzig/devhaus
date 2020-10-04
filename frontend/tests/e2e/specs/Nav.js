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
      .contains("Calendar")
      .click();
    cy.location("pathname").should("eq", "/calendar");
    // Members
    cy.get("nav")
      .contains("Members")
      .click();
    cy.location("pathname").should("eq", "/members");
    // Profile
    cy.get("nav")
      .contains("Profile")
      .click();
    cy.location("pathname").should("eq", "/profile/9yfZpdDgKIcBwLrmIRenQN9Xdxi1");
    // Home
    cy.get("nav")
      .contains("Home")
      .click();
    cy.location("pathname").should("eq", "/");
  });
});
