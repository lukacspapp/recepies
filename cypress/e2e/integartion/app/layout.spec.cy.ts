describe('RootLayout', () => {
  it('should render correctly', () => {
    cy.visit('http://localhost:3000/')

    cy.get('[data-test-id="root-layout"]').should('exist');
  });
});