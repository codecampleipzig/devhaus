// https://docs.cypress.io/api/introduction/api.html

// SignIn
describe("Profile", () => {
  it("Signs in as test user, clicks on profile", () => {
    cy.visit("/auth/signin");
    cy.location("pathname").should("eq", "/auth/signin");
    cy.get("form").within(() => {
      cy.get("input[placeholder=Email]").type("cypress@test.com");
      cy.get("input[placeholder=Password]").type("Lotte123");
      cy.get("input[type=submit]").click();
    });
    cy.get("nav")
      .contains("Profile")
      .click();
    cy.location("pathname").should("eq", "/profile/s6hxMKPQOqa8r65HoWT584xo7zG3");
  });
});
