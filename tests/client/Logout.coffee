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
    @test.assertTextExists 'You have been logged out'

# Light the fuse
casper.run ->
    @exit()
