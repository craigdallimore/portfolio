casper = require('casper').create()
testUser = require('./tests/dummy/user').user
testBook = require('./tests/dummy/book').book
baseUrl = 'http://localhost:3000/'
loginUrl = baseUrl + 'login'
logoutUrl = baseUrl + 'logout'
url = baseUrl + 'cms/'

casper.start logoutUrl, ->
    currentUrl = @getCurrentUrl()

    @echo 'Testing CMS', 'INFO_BAR'
    @test.info 'Logging out'
    @test.assertEqual currentUrl, baseUrl, 'URL is the one expected'

casper.thenOpen url, ->
    currentUrl = @getCurrentUrl()

    @test.info 'Navigated to CMS - should be redirected to /login'
    @test.assertEquals loginUrl, currentUrl, 'URL is the one expected'
    @test.assertTitle 'Log In', 'Page title is Login'

    @fill '.form-login',
        email: testUser.email
        password: testUser.password
    , true

casper.then ->
    currentUrl = @getCurrentUrl()

    @test.info 'Submitted login form, url is ' + currentUrl
    @test.assertEquals url, currentUrl, 'URL is the one expected'
    @test.assertTitle 'CMS', 'Page title is CMS'
    @test.assertTextExists 'apikey', 'API key is shown'

    # user can log out

    @test.assertExists '#bookTable', 'A table of books is present'

    # user can create books
    @test.assertExists '.form-new-book', 'A new book form exists'
    @test.assertExists '.form-new-book input[name="title"]', 'A title input is present'
    @test.assertExists '.form-new-book input[name="author"]', 'An author input is present'
    @test.assertExists '.form-new-book input[name="link"]', 'An link input is present'
    @test.assertExists '.form-new-book input[name="label"]', 'An label input is present'

    @test.info 'Submit a new book'
    @fill '.form-new-book',
        title: testBook.title
        author: testBook.author
        link: testBook.link
        label: testBook.label

    @click '.form-new-book input[type="submit"]'

casper.then ->
    currentUrl = @getCurrentUrl()

    @test.info 'Submitted new book form, url is ' + currentUrl
    @test.assertEquals currentUrl, url, 'URL is the one expected'
    @test.assertTitle 'CMS', 'Page title is CMS'
    @test.assertTextExists testBook.title, 'The new book is shown in the list:' + testBook.title
    @test.assertEval ->
        __utils__.findAll('#bookTable tbody tr').length > 0
    , 'There are book items in the table'

    # incomplete book info wont result in a book being created
    # a toast message should show when an async operation completes
    # a spinner should show during async operation
    # a failed async operation will undo its effect

    # user can update books
    # user can delete books
    @test.info 'Removing a book'
    number_of_books = @evaluate ->
        __utils__.findAll('#bookTable tbody tr').length

    @echo 'Number of books: ' + number_of_books
    @test.assertExists '#bookTable tr button.remove', 'A remove button should exist on a book row'
    @click '#bookTable tbody tr .remove'

# casper.then ->
    updated_number_of_books = @evaluate ->
        __utils__.findAll('#bookTable tbody tr').length
    @echo 'Clicked remove, updated number of books: ' + updated_number_of_books

    @test.assertNotEquals number_of_books, updated_number_of_books, 'The number of rows of books should change'


    # user can create tech
    # user can read tech
    # user can update tech
    # user can delete tech

    # user can create projects
    # user can read projects
    # user can update projects
    # user can delete projects

    # user can create networks
    # user can read networks
    # user can update networks
    # user can delete networks

    # user can delete their account

    # NEW BEHAVIOURS

    # user can create new posts in markdown
    # user can read a list of posts
    # user can update a post
    # user can delete a post

# Light the fuse
casper.run ->
    @exit()
