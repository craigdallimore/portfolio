# casperjs tests
# prerequisites:
#    phantomjs
#    casperjs
#    server is running on port 3000
#    db is opened
#    no users exist in the database

casper = require('casper').create()
testUser = require('./tests/dummy/user').user
baseUrl = 'http://localhost:3000/'
url = baseUrl + 'register'

casper.start url, ->
    currentUrl = @getCurrentUrl()

    @echo 'Testing Registration Page', 'INFO_BAR'
    @test.assertEqual currentUrl, url, 'URL is the one expected'
    @test.assertTitle 'Register', 'Page title is Register'
    @echo 'Testing Login form structure', 'INFO_BAR'
    @test.assertExists 'form.form-register', 'Register form exists'
    @test.assertExists '#email', 'Email input exists'
    @test.assertExists '#password', 'Password input exists'
    @test.assertExists '#confirm-password', 'Confirm Password input exists'
    @test.assertExists '#submit', 'Submit input exists'

    action = @evaluate ->
        __utils__.findOne('.form-register').getAttribute 'action'
    @test.assertEqual action, '/register', 'Register form action is /register'
    method = @evaluate ->
        __utils__.findOne('.form-register').getAttribute 'method'
    @test.assertEqual method, 'POST', 'Register form method is POST'

    @echo 'Testing /login link', 'INFO_BAR'
    @test.assertExists 'a[href="/login"]', 'Login link exists'
    @click 'a[href="/login"]'

casper.then ->
    currentUrl= @getCurrentUrl()
    expectedUrl = baseUrl + 'login'
    @echo 'Clicked register link, url is now ' + currentUrl
    @test.assertTitle 'Log In', 'Title is now "Log In"'
    @test.assertEqual currentUrl, expectedUrl, 'URL is the one expected'
    @back()

casper.then ->

    @echo 'Navigated back, url is now ' + @getCurrentUrl()
    @echo 'Testing Empty Register action', 'INFO_BAR'
    @click '#submit'
    # TODO (JS) submit should not do anything until both email and password fields are filled

casper.then ->
    currentUrl = @getCurrentUrl()

    @echo 'Register submit button was clicked, url is now ' + currentUrl
    @test.assertEqual currentUrl, url, 'The user should still be on the register screen'
    @test.assertTitle 'Register', 'Page title is Register'
    @test.assertTextExists 'Missing Credentials', 'There should be an Missing Credentials message showing'

casper.then ->
    @echo 'Testing mismatched passwords', 'INFO_BAR'
    @fill '.form-register',
        email: testUser.email
        password: testUser.password
        confirm_password: 'nope'
    , true

casper.then ->
    currentUrl = @getCurrentUrl()

    @echo 'Register submit button was clicked, url is now ' + currentUrl
    @test.assertEqual currentUrl, url, 'The user should still be on the register screen'
    @test.assertTitle 'Register', 'Page title is Register'
    @test.assertTextExists 'Passwords did not match', 'There should be a Passwords do not match message showing'

    @echo 'Testing valid registration!', 'INFO_BAR'
    @fill '.form-register',
        email: testUser.email
        password: testUser.password
        confirm_password: testUser.password
    , true

casper.then ->
    currentUrl = @getCurrentUrl()

    @echo 'New credentials were posted, URL is now ' + currentUrl
    @test.assertTitle 'CMS', 'Title is now CMS'
    @test.assertTextExists 'You have logged in', 'There should be a message confirming the log in'

# Light the fuse
casper.run ->
    @exit()

