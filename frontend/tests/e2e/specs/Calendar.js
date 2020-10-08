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
      .contains("Calendar")
      .click();
    cy.location("pathname").should("eq", "/calendar");
  });

  it("Signs in as test user, clicks on calendar, clicks on 'View all'", () => {
    cy.visit("/auth/signin");
    cy.location("pathname").should("eq", "/auth/signin");
    cy.get("form").within(() => {
      cy.get("input[placeholder=Email]").type("cypress@test.com");
      cy.get("input[placeholder=Password]").type("Lotte123");
      cy.get("input[type=submit]").click();
    });
    cy.get("nav")
      .contains("Calendar")
      .click();
    cy.location("pathname").should("eq", "/calendar");

    cy.contains("View All").click();
    cy.location("pathname").should("eq", "/view-events/all-events");
    cy.get("h1").contains("Upcoming Events");
  });

  it("Signs in as test user, clicks on calendar, clicks on 'VIEW ALL', clicks on 'Your events'", () => {
    cy.visit("/auth/signin");
    cy.location("pathname").should("eq", "/auth/signin");
    cy.get("form").within(() => {
      cy.get("input[placeholder=Email]").type("cypress@test.com");
      cy.get("input[placeholder=Password]").type("Lotte123");
      cy.get("input[type=submit]").click();
    });
    cy.get("nav")
      .contains("Calendar")
      .click();
    cy.location("pathname").should("eq", "/calendar");

    cy.contains("View All").click();
    cy.location("pathname").should("eq", "/view-events/all-events");
    cy.get("h1").contains("Upcoming Events");
    cy.contains("Your Events").click();
    cy.location("pathname").should("eq", "/view-events/my-events");
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
      .contains("Calendar")
      .click();
    cy.location("pathname").should("eq", "/calendar");

    cy.contains("New Event").click();
    cy.location("pathname").should("eq", "/create-event");
    cy.get("input[placeholder='Event Title']").type("Cypress Test Event");
    cy.get("input[placeholder='Event Description']").type("Test Description");
    cy.get("input[placeholder='Select location type:']").click();
    cy.contains("online").click();
    cy.contains("Create event").click();
    cy.contains("Your event has been created");
  });
});
