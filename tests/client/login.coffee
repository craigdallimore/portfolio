# casperjs tests
# prerequisites:
#    phantomjs
#    casperjs
#    server is running on port 3000
#    db is opened

casper = require('casper').create()
baseUrl = 'http://localhost:3000/'
url = baseUrl + 'login'

casper.start url, ->
    currentUrl = @getCurrentUrl()

    @echo 'Testing Login Page', 'INFO_BAR'
    @test.assertEqual currentUrl, url, 'URL is the one expected'
    @test.assertTitle 'Log In', 'Page title is Log In'
    @echo 'Testing Login form structure', 'INFO_BAR'
    @test.assertExists 'form.form-login', 'Login form exists'
    @test.assertExists '#email', 'Email input exists'
    @test.assertExists '#password', 'Password input ists'
    @test.assertExists '#submit', 'Submit input exists'
    action = @evaluate ->
        __utils__.findOne('.form-login').getAttribute 'action'
    @test.assertEqual action, '/login', 'Login form action is /login'
    method = @evaluate ->
        __utils__.findOne('.form-login').getAttribute 'method'
    @test.assertEqual method, 'POST', 'Login form method is POST'

    @echo 'Testing /register link', 'INFO_BAR'
    @test.assertExists 'a[href="/register"]', 'Register link exists'
    @click 'a[href="/register"]'

casper.then ->
    currentUrl= @getCurrentUrl()
    expectedUrl = baseUrl + 'register'
    @echo 'Clicked register link, url is now ' + currentUrl
    @test.assertTitle 'Register', 'Title is now "Register"'
    @test.assertEqual currentUrl, expectedUrl, 'URL is the one expected'
    @back()

casper.then ->

    @echo 'Navigated back, url is now ' + @getCurrentUrl()
    @echo 'Testing Empty Login action', 'INFO_BAR'
    @click '#submit'
    # TODO (JS) submit should not do anything until both email and password fields are filled

casper.then ->
    currentUrl = @getCurrentUrl()

    @echo 'Login submit button was clicked, url is now ' + currentUrl
    @test.assertEqual currentUrl, url, 'The user should still be on the login screen'
    @test.assertTitle 'Log In', 'Page title is Log In'
    @test.assertTextExists 'No Credentials', 'There should be an No Credentials message showing'

    @echo 'Testing invalid email', 'INFO_BAR'
    @fill '.form-login',
        'email': 'notanemail',
        'password': 'nope'
    , true

casper.then ->
    currentUrl = @getCurrentUrl()

    @echo 'Login submit button was clicked, url is now ' + currentUrl
    @test.assertEqual currentUrl, url, 'The user should still be on the login screen'
    @test.assertTitle 'Log In', 'Page title is Log In'
    @test.assertTextExists 'Invalid Credentials', 'There should be an Invalid Credentials message showing'

    @echo 'Testing valid credentials', 'INFO_BAR'
    @fill '.form-login',
        'email': 'test@plusplusplusplus.com',
        'password': 'testtest'
    , true

casper.then ->
    currentUrl = @getCurrentUrl()

    @echo 'Login submit button was clicked, url is now ' + currentUrl
    @test.assertEqual currentUrl, baseUrl + 'cms', 'The user should now be on the cms screen'
    @test.assertTitle 'CMS', 'Page title is CMS'
    # TODO LOGIN input is sanitized

# Light the fuse
casper.run ->
    @exit()

