describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  });

  it('should display the correct title and description', () => {
    cy.get('[data-test-id="page-title"]').should('have.text', 'Search for Recipes');
    cy.get('[data-test-id="page-description"]').should('have.text', 'By Ingredients or Cuisine');
  });

  it('should display the navigation bar', () => {
    cy.get('[data-test-id="nav"]').should('exist');
    cy.get('[data-test-id=nav] a')
      .should('exist')
      .and('have.attr', 'href')
      .and('include', '/');

    const navBarTrigger = cy.get('[data-test-id="nav-trigger"]')

    navBarTrigger.click();

    cy.get('[data-test-id="profile-login"]').should('exist');
    cy.get('[data-test-id="profile-signup"]').should('exist');

  })

});