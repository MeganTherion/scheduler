describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("localhost:8000");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("localhost:8000");
    cy.contains("[data-testid=day]", "Tuesday")
    .click()
    .should("have.class", "day-list__item--selected")
  });
});
