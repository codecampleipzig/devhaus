// https://docs.cypress.io/api/introduction/api.html

// SignIn
describe("Calendar", () => {
  it("Signs in as test user, clicks on calendar", () => {
    cy.visit("/auth/signin");
    cy.location("pathname").should("eq", "/auth/signin");
    cy.get("form").within(() => {
      cy.get("input[placeholder=Email]").type("cypress@test.com");
      cy.get("input[placeholder=Password]").type("Lotte123");
      cy.get("input[type=submit]").click();
    });
    cy.get("nav")
      .contains("Events")
      .click();
    cy.location("pathname").should("eq", "/view-events/all-events");
  });

  it("Signs in as test user, clicks on calendar, clicks on 'VIEW ALL', clicks on 'Your events'", () => {
    cy.visit("/auth/signin");
    cy.location("pathname").should("eq", "/auth/signin");
    cy.get("form").within(() => {
      cy.get("input[placeholder=Email]").type("cypress@test.com");
      cy.get("input[placeholder=Password]").type("Lotte123");
      cy.get("input[type=submit]").click();
    });
  });

  it("Signs in as test user, clicks on calendar, clicks on 'NEW EVENT', fills in form, creates Event", () => {
    cy.visit("/auth/signin");
    cy.location("pathname").should("eq", "/auth/signin");
    cy.get("form").within(() => {
      cy.get("input[placeholder=Email]").type("cypress@test.com");
      cy.get("input[placeholder=Password]").type("Lotte123");
      cy.get("input[type=submit]").click();
    });

    cy.get("nav")
      .contains("Events")
      .click();

    cy.contains("Create New Event").click();

    cy.location("pathname").should("eq", "/create-event");
    cy.get("input[placeholder='Event Title']").type("Cypress Test Event");
    cy.get("input[placeholder='Event Description']").type("Test Description");
    cy.get("input[placeholder='Select location type:']").type("online");
    cy.contains("Create event").click();
    cy.contains("Your event has been created");
  });
});
