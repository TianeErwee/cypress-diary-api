/// <reference types="Cypress" />

describe('nav', () => {
  it('should open dashboard', () => {
    cy.visit('http://localhost:4200/');
    cy.wait(1000);
    cy.url().should('include', '/dashboard');
  });

  it('should open list of entries', () => {
    cy.get('#view-entries').click();
    cy.url().should('include', '/entries/list');
  });

  it('should open create-entry page', () => {
    cy.get('#create-entry').click();
    cy.url().should('include', '/entries/create-entry');
  });

  it('should go back to list on cancel', () => {
    cy.get('#cancel').click();
    cy.url().should('include', '/entries/list');
  });
});
