# casperjs tests
# prerequisites:
#    phantomjs
#    casperjs
#    server is running on port 3000
#    db is opened

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
    @test.assertEval ->
        __utils__.findAll('#bookTable tbody tr').length > 0
    , 'There are book items in the table'

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
    , true

casper.then ->
    currentUrl = @getCurrentUrl()

    @test.info 'Submitted new book form, url is ' + currentUrl
    @test.assertEquals currentUrl, url, 'URL is the one expected'
    @test.assertTitle 'CMS', 'Page title is CMS'
    @test.assertTextExists testBook.title, 'The new book is shown in the list:' + testBook.title
    # user can read books

    # user can update books
    # user can delete books

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
