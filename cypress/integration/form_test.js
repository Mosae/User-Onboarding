describe('Testing our form inputs', function() {
	beforeEach(function() {
		cy.visit('http://localhost:3000/');
	});
	it('Adds text to inputs and submits form', function() {
		cy.get('input[name="name"]')
			.type('Mosae')
			.should('have.value', 'Mosae');
		cy.get('input[name="email"] ')
			.type('email@email.com')
			.should('have.value', 'email@email.com');
	});
});
