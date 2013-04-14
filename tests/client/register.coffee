# casperjs tests
# prerequisites:
#    phantomjs
#    casperjs
#    server is running on port 3000
#    db is opened

casper = require('casper').create()
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
    @test.assertTextExists 'No Credentials', 'There should be an No Credentials message showing'

    @echo 'Testing valid registration!', 'INFO_BAR'
    @fill '.form-register',
        'email': 'test@plusplusplusplus.com',
        'password': 'testtest',
        'confirm_password': 'testtest'
    , true

casper.then ->
    currentUrl = @getCurrentUrl()

    @echo 'New credentials were added, URL is now ' + currentUrl
    @test.assertTitle 'CMS', 'Title is now CMS'


    # mismatched passwords
    # existing email
    # invalid email?
    # Passwords are hashed
    # REGISTER input is sanitized
    # REGISTER users can be deleted
    # REGISTER users must have email and password
    # REGISTER passwords are hashed (dunno where PP comes in here)
    # Only one person can be registered at a time. Me.
    # successful register / login will start a session
    # successful login will show the CMS controls after a login at /CMS
    # user can log out
    # logged out users see the login / register forms at /cms
    # when users are logged out, their session will close


# Light the fuse
casper.run ->
    @exit()

