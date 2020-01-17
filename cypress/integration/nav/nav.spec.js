/// <reference types="Cypress" />

describe('nav', () => {
  it('should open dashboard', () => {
    cy.visit('http://localhost:4200/entries/list');
    cy.wait(1000);
  });
});
