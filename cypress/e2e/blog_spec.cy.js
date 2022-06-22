describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'AdminUser',
      username: 'admin',
      password: 'root'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
    cy.contains('login').click()
    cy.get('#username').type('admin')
    cy.get('#password').type('root')
    cy.get('#login-button').click()
    cy.get('html').should('contain', 'AdminUser logged-in')
    })

    it('fails with wrong credentials', function() {
    cy.contains('login').click()
    cy.get('#username').type('admin')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
    .should('contain', 'Wrong credentials')
    .and('have.css', 'color', 'rgb(255, 0, 0)')
    .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'AdminUser logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'admin', password: 'root' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('TestBlog')
      cy.get('#author').type('TestAuthor')
      cy.get('#url').type('test.com')
      cy.get('#create').click()

      cy.get('html').should('contain', 'TestBlog TestAuthor')
    })

    it('User can like a blog', function() {
      cy.createBlog({title: 'Coolblog', author: 'Marc', url: 'google.com'})
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes 1')
    })
  })

  
})