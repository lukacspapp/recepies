describe('RootLayout', () => {
  it('should render correctly', () => {
    cy.visit(`${process.env.NEXT_PUBLIC_BASE_URL}`)

    cy.get('[data-test-id="root-layout"]').should('exist');
  });
});