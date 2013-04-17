# casperjs tests
# prerequisites:
#    phantomjs
#    casperjs
#    server is running on port 3000
#    db is opened

casper = require('casper').create()
baseUrl = 'http://localhost:3000/'
url = baseUrl + 'logout/'

casper.start url, ->
    currentUrl = @getCurrentUrl()
    @test.info 'Testing logout'
    @echo 'URL is now ' + currentUrl
    @test.assertNotEquals url, currentUrl, 'User has been redirected'
    @test.assertTitle 'Index', 'User is on index page'
    @test.assertTextExists 'You have been logged out', 'The user will be informed they have logged out'
    @test.info 'Trying to re-enter CMS'

casper.thenOpen baseUrl + 'cms', ->
    currentUrl= @getCurrentUrl()
    expectedUrl = baseUrl + 'login'
    @echo 'Navigated to /cms, url is now ' + currentUrl
    @test.assertTitle 'Log In', 'Title is now "Log In"'
    @test.assertEqual currentUrl, expectedUrl, 'URL is the one expected'
    @back()

# Light the fuse
casper.run ->
    @exit()
