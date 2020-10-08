// https://docs.cypress.io/api/introduction/api.html

// SignIn
describe("Members", () => {
  it("Signs in as test user, visits /members, searches for 'dorian wilhelm'", () => {
    cy.visit("/auth/signin");
    cy.location("pathname").should("eq", "/auth/signin");
    cy.get("form").within(() => {
      cy.get("input[placeholder=Email]").type("cypress@test.com");
      cy.get("input[placeholder=Password]").type("Lotte123");
      cy.get("input[type=submit]").click();
    });
    cy.visit("/members");
    cy.location("pathname").should("eq", "/members");
    cy.get("input[placeholder=Search]").type("dorian wilhelm");
    cy.contains("Dorian");
  });

  // it("signs in as test user, visists /members and clicks on image to go to profile", () => {
  //   cy.visit("/auth/signin");
  //   cy.location("pathname").should("eq", "/auth/signin");
  //   cy.get("form").within(() => {
  //     cy.get("input[placeholder=Email]").type("cypress2@test.com");
  //     cy.get("input[placeholder=Password]").type("Lotte123");
  //     cy.get("input[type=submit]").click();
  //   });
  //   cy.visit("/members");
  //   cy.location("pathname").should("eq", "/members");
  //   cy.get("image").click();
  //   cy.location("pathname").should("contain", "/profile");
  // });
});
