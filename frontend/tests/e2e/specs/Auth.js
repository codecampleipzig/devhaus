// https://docs.cypress.io/api/introduction/api.html

// SignIn
describe("Signin", () => {
  it("Visits the sign in page and enters information of an existing profile", () => {
    cy.visit("/auth/signin");
    cy.location("pathname").should("eq", "/auth/signin");
    cy.get("form").within(() => {
      cy.get("input[placeholder=Email]").type("cypress@test.com");
      cy.get("input[placeholder=Password]").type("Lotte123");
      cy.get("input[type=submit]").click();
    });
    cy.location("pathname").should("eq", "/");
  });

  it("signs in with user but no profile and lands on /register", () => {
    cy.visit("/auth/signin");
    cy.location("pathname").should("eq", "/auth/signin");
    cy.get("form").within(() => {
      cy.get("input[placeholder=Email]").type("cypress2@test.com");
      cy.get("input[placeholder=Password]").type("Lotte123");
      cy.get("input[type=submit]").click();
    });
    cy.location("pathname").should("eq", "/register");
  });
});

// Logout
describe("Logout", () => {
  it("Signs user in and logs out again", () => {
    // Signing in
    cy.visit("/auth/signin");
    cy.location("pathname").should("eq", "/auth/signin");
    cy.get("form").within(() => {
      cy.get("input[placeholder=Email]").type("cypress@test.com");
      cy.get("input[placeholder=Password]").type("Lotte123");
      cy.get("input[type=submit]").click();
    });
    // Logging out
    cy.get("nav")
      .contains("Logout")
      .click();
    cy.location("pathname").should("eq", "/auth/signin");
    cy.contains("Sign In");
  });
});
