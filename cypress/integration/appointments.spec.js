describe("Appointments", () => {
  beforeEach(()=> {
    cy.request("http://localhost:8000/api/debug/reset")
    cy.visit("http://localhost:8000");
  })
    
  it("should book an interview", () => {
    
    cy.contains("li", "Tuesday")
      .click()
    cy.get("[alt=Add]")
      .first()
      .click()
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones")
    cy.get("[alt='Sylvia Palmer']")
      .click()
    cy.contains("button", "Save")
      .click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });
/////////////////
  it("should edit an interview", () => {
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true });
      cy.get("[data-testid=student-name-input]").clear().type("Roger Pelican");
  cy.get("[alt='Tori Malcolm']").click();

  cy.contains("Save").click();

  cy.contains(".appointment__card--show", "Roger Pelican");
  cy.contains(".appointment__card--show", "Tori Malcolm");
  });
/////////////////
  it("should cancel an interview", () => {
    cy.get("[alt=Delete]")
      .click({ force: true });
  
    cy.contains("Confirm").click();
  
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
  
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
});
