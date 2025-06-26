describe('Note app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:5173')
  })
  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('HTML is easy')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
    cy.get('#username').type('muskan7')
    cy.get('#password').type('password123')
    cy.get('#loginButton').click()

    cy.contains('Create a new note')
  })
})