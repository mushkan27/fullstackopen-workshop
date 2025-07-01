describe('Note app', function() {
  beforeEach(function() {
 cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
     const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')

})

  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#loginButton').click()

    // cy.contains('invalid username or password')
    // cy.get('.error').contains('invalid username or password')
    cy.get('.error')
    .should('contain', 'invalid username or password')
    .and('have.css', 'background-color', 'rgb(255, 0, 0)')
    .and('have.css', 'font-size', '30px')

    cy.get('html').should('not.contain', 'Matti Luukkainen logged in')

    cy.contains('Matti Luukkainen logged in').should('not.exist')
  })


  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('this is fake')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#loginButton').click()

    cy.contains('Create a new note')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('a new note can be created', function() {
      cy.contains('new note').click()
      cy.get('#inputNote').type('a note created by cypress', { force: true })
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createNote({
          content: 'another note cypress',
          important: true
        })
      })

      it('it can be made not important', function () {
        cy.contains('another note cypress')
          .contains('Change true')
          .click()

        cy.contains('another note cypress')
      })
    })
  })
})