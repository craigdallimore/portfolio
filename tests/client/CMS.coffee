# casperjs tests
# prerequisites:
#    phantomjs
#    casperjs
#    server is running on port 3000
#    db is opened

casper = require('casper').create()
baseUrl = 'http://localhost:3000/'
url = baseUrl + 'cms/'

casper.start url, ->
    currentUrl = @getCurrentUrl()

    @echo 'Testing CMS', 'INFO_BAR'
    # Should redirect to /login if there is no authenticated user session
    @test.assertEqual currentUrl, url, 'URL is the one expected'
    @test.assertTitle 'CMS', 'Page title is CMS'
    # successful register / login will start a session
    # successful login will show the CMS controls after a login at /CMS
    # user can log out
    # logged out users see the login / register forms at /cms
    # when users are logged out, their session will close


# Light the fuse
casper.run ->
    @exit()
