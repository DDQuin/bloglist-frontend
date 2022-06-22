describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'AdminUser',
      username: 'admin',
      password: 'root'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    const user2 = {
      name: 'NormalUser',
      username: 'normal',
      password: 'cool'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user2) 
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

    it('User can delete a blog', function() {
      cy.createBlog({title: 'Coolblog2', author: 'Marc', url: 'google.com'})
      cy.contains('view').click()
      cy.get('#remove').should('exist')
      cy.contains('remove').click()
      cy.get('html').should('not.contain', 'Coolblog2')
    })

    it('Other User can not delete a blog', function() {
      cy.createBlog({title: 'Coolblog2', author: 'Marc', url: 'google.com'})
      cy.login({ username: 'normal', password: 'cool' })
      cy.contains('view').click()
      cy.get('#remove').should('not.exist')
    })

    it('Blog ordered by likes', function() {
      cy.createBlog({title: 'Coolblog1', author: 'Marc', url: 'google.com'})
      cy.createBlog({title: 'Coolblog2', author: 'Marc', url: 'google.com'})
      cy.createBlog({title: 'Coolblog3', author: 'Marc', url: 'google.com'})
      // open all 3 blogs for liking
      cy.get('[data="blog"]').eq(0).contains('view').click()
      cy.get('[data="blog"]').eq(1).contains('view').click()
      cy.get('[data="blog"]').eq(2).contains('view').click()

      // like Coolblog 2, two times
      cy.get('[data="blog"]').eq(1).contains('like').click()
      cy.wait(500)
      cy.get('[data="blog"]').eq(1).contains('like').click()
      cy.wait(500)

      // like Coolblog 1, one time
      cy.get('[data="blog"]').eq(0).contains('like').click()
      cy.wait(500)

      // order should be coolblog2, coolblog1 and coolblog3
      cy.get('[data="blog"]').eq(0).contains('Coolblog2')
      cy.get('[data="blog"]').eq(1).contains('Coolblog1')
      cy.get('[data="blog"]').eq(2).contains('Coolblog3')
    })
  })

  
})