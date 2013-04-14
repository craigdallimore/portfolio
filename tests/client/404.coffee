# casperjs tests
# prerequisites:
#    phantomjs
#    casperjs
#    server is running on port 3000
#    db is opened

casper = require('casper').create()
baseUrl = 'http://localhost:3000/'
url = 'http://localhost:3000/nope/'

casper.start url, ->
    @test.assertTitle '404', 'Title is 404'
    @test.assertTextExists '404', 'A 404 message is on the page'

    @test.assertExists 'a[href="/"]', 'An index button exists'
    @click 'a[href="/"]'

casper.then ->
    currentUrl = @getCurrentUrl()
    expectedUrl = baseUrl
    @echo 'Clicked index link, Navigated to ' + currentUrl
    @test.assertEqual currentUrl, currentUrl, 'URL is the one expected'

# Light the fuse
casper.run ->
    @exit()
