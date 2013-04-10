# casperjs tests
# prerequisites:
#    phantomjs
#    casperjs
#    server is running on port 3000
#    db is opened

casper = require('casper').create()
baseUrl = 'http://localhost:3000/'
url = baseUrl + 'about/'

casper.start url, ->
    currentUrl = @getCurrentUrl()
    expectedUrl = baseUrl + 'about/'

    @echo 'From HTTP Navigation:', 'INFO_BAR'
    @test.assertTitle 'About / Contact', 'The page title is "About / Contact"'
    @test.assertEquals currentUrl, expectedUrl, 'URL is the one expected'
    @test.assertExists '.techList .tipList', 'tech list exists'
    @test.assertExists '.profile', 'profile exists'
    @test.assertExists '.networkList .tipList', 'network list exists'
    @test.assertExists '.techList .tipList', 'tech list exists'

    @test.assertExists '.profile figure', 'Profile figure exists'

    @test.assertEval ->
        __utils__.findAll('.networkList .tipList li').length >= 1
    , 'networkList has some list items in it'

    @test.assertEval ->
        __utils__.findAll('.techList .tipList li').length >= 1
    , 'techList has some list items in it'

    @test.assertEval ->
        __utils__.findAll('.bookList .tipList li').length >= 1
    , 'bookList has some list items in it'

    @test.assertExists 'a[href="/projects/"]', 'Projects link exists'
    @click 'a[href="/projects/"]'

casper.then ->
    currentUrl = @getCurrentUrl()
    expectedUrl = baseUrl + 'projects/'

    @echo 'Clicked projects link, location is now ' + currentUrl, 'INFO'
    @test.assertEquals currentUrl, expectedUrl, 'URL is the one expected'
    @back()

casper.then ->
    currentUrl = @getCurrentUrl()

    @echo 'Navigated back, location is now ' + currentUrl, 'INFO'
    @echo 'From SPA Navigation:', 'INFO_BAR'

    @test.assertTitle 'About / Contact', 'The page title is "About / Contact"'
    @test.assertEquals currentUrl, baseUrl + 'about/', 'URL is the one expected'
    @test.assertExists '.techList .tipList', 'tech list exists'
    @test.assertExists '.profile', 'profile exists'
    @test.assertExists '.networkList .tipList', 'network list exists'
    @test.assertExists '.techList .tipList', 'tech list exists'

    @test.assertExists '.profile figure', 'Profile figure exists'

    @test.assertEval ->
        __utils__.findAll('.networkList .tipList li').length >= 1
    , 'networkList has some list items in it'

    @test.assertEval ->
        __utils__.findAll('.techList .tipList li').length >= 1
    , 'techList has some list items in it'

    @test.assertEval ->
        __utils__.findAll('.bookList .tipList li').length >= 1
    , 'bookList has some list items in it'


# Light the fuse
casper.run ->
    @exit()
