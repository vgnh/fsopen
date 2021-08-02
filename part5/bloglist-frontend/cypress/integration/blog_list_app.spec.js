describe('Blog list app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3000/api/tests/reset')
    cy.addUser({ username: 'hellas', name: 'Arto Hellas', password: 'qwerty' })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('hellas')
      cy.get('#password').type('qwerty')
      cy.get('#loginSubmitButton').click()

      cy.contains('Arto Hellas logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('hellas')
      cy.get('#password').type('wrong password')
      cy.get('#loginSubmitButton').click()

      cy.get('.notification').contains('wrong username or password')
    })

    it('notification shown with unsuccessful login is red', function () {
      cy.get('#username').type('hellas')
      cy.get('#password').type('wrong password')
      cy.get('#loginSubmitButton').click()

      cy.get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'hellas', password: 'qwerty' })
    })

    it('a blog can be created', function () {
      cy.contains('create new blog').click()

      cy.get('#blogTitle').type('Something About Rust')
      cy.get('#blogAuthor').type('Amos')
      cy.get('#blogUrl').type('https://fasterthanli.me')
      cy.get('#createButton').click()

      cy.get('.blogCard').should('contain', 'Something About Rust Amos')
    })

    describe('And a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'Something About Rust', author: 'Amos', url: 'https://fasterthanli.me', likes: 21 })
      })

      it('user can like a blog', function () {
        //cy.contains('Something About Rust Amos').get('#showInfoButton').click().get('#likeButton').click()

        cy.contains('Something About Rust Amos').get('#showInfoButton').click()
        cy.contains('Something About Rust Amos').get('#likesString').invoke('text').then(text1 => {
          // Get likes before clicking the like button
          const likesBefore = parseInt(text1.trim().split(' ')[1])

          // Click the like button and wait
          cy.contains('Something About Rust Amos').get('#likeButton').click()
          cy.wait(1000)

          cy.contains('Something About Rust Amos').get('#likesString').invoke('text').then(text2 => {
            // Get likes after clicking the like button
            const likesAfter = parseInt(text2.trim().split(' ')[1])

            // Check if likes after clicking the button is greater than before
            cy.wrap(likesAfter).should('be.gt', likesBefore)
          })
        })
      })

      it('user who created the blog can delete it', function () {
        cy.contains('Something About Rust Amos').get('#showInfoButton').click().get('#removeButton').click()
        cy.contains('Something About Rust Amos').should('not.exist')
      })

      it('users cannot delete other users blogs', function () {
        cy.get('#logoutButton').click()

        // Logout and login as new user and try to remove other user's blog
        cy.addUser({ username: 'asdfg', name: 'Asdfg Hjkl', password: '12345' })
        cy.login({ username: 'asdfg', password: '12345' })

        cy.contains('Something About Rust Amos').get('#showInfoButton').click().should('not.contain', '#removeButton')
      })
    })

    describe('And many blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'Something About Rust', author: 'Amos', url: 'https://fasterthanli.me', likes: 21 })
        cy.createBlog({ title: 'Something Awesome', author: 'Filip Hracek', url: 'https://selfimproving.dev', likes: 20 })

        cy.get('#logoutButton').click()

        // Create a blog with a different user
        cy.addUser({ username: 'asdfg', name: 'Asdfg Hjkl', password: '12345' })
        cy.login({ username: 'asdfg', password: '12345' })
        cy.createBlog({ title: 'Guild of Dungeoneering', author: 'Ron Gilbert', url: 'https://grumpygamer.com', likes: 22 })
      })

      it('blogs are ordered according to likes in descending order', function () {
        let likesArray

        // Click all 'view' buttons
        cy.get('[id="showInfoButton"]')
          .each(button => {
            cy.wrap(button).click()
          })

        // Get all the 'likes <num>' strings and confirm the numbers in order
        cy.get('[id="likesString"]').then(spn => {
          likesArray = [...spn].map(el => parseInt(el.textContent.trim().split(' ')[1]))

          cy.wrap(likesArray[0]).should('eq', 22)
          cy.wrap(likesArray[1]).should('eq', 21)
          cy.wrap(likesArray[2]).should('eq', 20)
        })
      })
    })
  })
})