# casperjs tests
# prerequisites:
#    phantomjs
#    casperjs
#    server is running on port 3000
#    db is opened

casper = require('casper').create()
url = 'http://localhost:3000/'

casper.start url, ->
    currentUrl = @getCurrentUrl()

    @echo 'Navigate: /', 'INFO'
    @echo 'From HTTP Navigation:', 'INFO_BAR'
    @test.assertTitle 'Index', 'The page title is "Index"'
    @test.assertEquals currentUrl, url, 'URL is the one expected'
    @test.assertExists 'a[href="/projects/"]', 'has a link to the projects page'
    @test.assertExists 'a[href="/about/"]', 'has a link to the about page'

    @click 'a[href="/projects/"]'

casper.then ->
    currentUrl = @getCurrentUrl()

    @echo 'Clicked projects link, location is now ' + currentUrl, 'INFO'
    @test.assertEquals currentUrl, url + 'projects/', 'URL is the one expected'
    @back()

casper.then ->
    currentUrl = @getCurrentUrl()

    @echo 'Navigated back, location is now ' + currentUrl, 'INFO'
    @click 'a[href="/about/"]'

casper.then ->
    currentUrl = @getCurrentUrl()

    @echo 'Clicked about link, location is now ' + currentUrl, 'INFO'
    @test.assertEquals currentUrl, url + 'about/', 'URL is the one expected'
    @back()

casper.then ->
    currentUrl = @getCurrentUrl()

    @echo 'From SPA Navigation:', 'INFO_BAR'
    @test.assertTitle 'Index', 'The page title is "Index"'
    @test.assertEquals currentUrl, url, 'URL is the one expected'
    @test.assertExists 'a[href="/projects/"]', 'has a link to the projects page'
    @test.assertExists 'a[href="/about/"]', 'has a link to the about page'

# Light the fuse
casper.run ->
    @exit()
