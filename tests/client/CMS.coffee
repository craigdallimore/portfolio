# casperjs tests
# prerequisites:
#    phantomjs
#    casperjs
#    server is running on port 3000
#    db is opened

casper = require('casper').create()
testUser = require('./tests/dummy/user').user
baseUrl = 'http://localhost:3000/'
loginUrl = baseUrl + 'login'
logoutUrl = baseUrl + 'logout'
url = baseUrl + 'cms/'

casper.start logoutUrl, ->
    currentUrl = @getCurrentUrl()

    @echo 'Testing CMS', 'INFO_BAR'
    @test.info 'Logging out'
    # Should redirect to /login if there is no authenticated user session
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



    # successful register / login will start a session
    # successful login will show the CMS controls after a login at /CMS
    # user can log out
    # logged out users see the login / register forms at /cms
    # when users are logged out, their session will close


# Light the fuse
casper.run ->
    @exit()
