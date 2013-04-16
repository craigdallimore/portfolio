# casperjs tests
# prerequisites:
#    phantomjs
#    casperjs
#    server is running on port 3000
#    db is opened

casper = require('casper').create()
baseUrl = 'http://localhost:3000/'
url = baseUrl + 'projects/'
singleUrl = url + 'trp/'

casper.start url, ->
    @test.assertEval ->
        __utils__.findAll('.tileList li').length >= 1
    , 'Projects list has items in it'

casper.then ->

    href = @evaluate ->
        __utils__.findOne('.tileList li:first-child .btn-more').getAttribute 'href'

    @click '.tileList li:first-child .btn-more'

    currentUrl = @getCurrentUrl()
    expectedUrl = baseUrl + href.substr 1

    @echo 'From SPA Navigation:', 'INFO_BAR'
    @echo 'Clicked "more" button, location is now ' + currentUrl, 'INFO'
    @test.assertEquals currentUrl, expectedUrl, 'URL is the one expected'

    @test.assertExists '.btn-next', 'Next button exists'
    @test.assertExists '.btn-prev', 'Prev button exists'
    @test.assertExists '.btn-link', 'External Link button exists'
    @test.assertExists '.btn-back', 'Back button exists'

    @click '.btn-back'
casper.then ->
    currentUrl = @getCurrentUrl()
    expectedUrl = baseUrl + 'projects/'

    @echo 'Clicked "back to projects" button, location is now ' + currentUrl, 'INFO'

    @test.assertEquals currentUrl, expectedUrl, 'URL is the one expected'

    @back()

casper.then ->
    currentUrl = @getCurrentUrl()
    @echo 'Navigated back in history, location is now ' + currentUrl, 'INFO'

casper.then ->
    previousUrl = @getCurrentUrl()
    previousTitle = @getTitle()
    previousHeading = @evaluate ->
        __utils__.findOne('h1').textContent

    @test.assertExists '.btn-next', 'Next button exists'
    @click '.btn-next'

    currentUrl = @getCurrentUrl()
    currentTitle = @getTitle()

    @echo 'Clicked "Next" button, location is now ' + currentUrl, 'INFO'

    currentHeading = @evaluate ->
        __utils__.findOne('h1').textContent

    @test.assertNotEquals currentUrl, previousUrl, 'URL has changed'
    @test.assertNotEquals currentHeading, previousHeading, 'Heading has changed'
    @test.assertNotEquals currentTitle, previousTitle, 'Title has changed'

    @test.assertExists '.btn-prev', 'Previous button exists'
    @click '.btn-prev'

    currentUrl = @getCurrentUrl()
    currentTitle = @getTitle()

    @echo 'Clicked "Prev" button, location is now ' + currentUrl, 'INFO'

    currentHeading = @evaluate ->
        __utils__.findOne('h1').textContent

    @test.assertEquals currentUrl, previousUrl, 'URL has changed back to what it was'
    @test.assertEquals currentHeading, previousHeading, 'Heading has changed back to what it was'
    @test.assertEquals currentTitle, previousTitle, 'Title has changed back to what it was'

    longDescription = @evaluate ->
        __utils__.findOne('.content p').textContent

    @test.assert longDescription.length > 0, 'Long description has content'

    @test.assertExists '.techList li', 'Tech list has a list item'
    @test.assertEval ->
        __utils__.findAll('.techList li').length >= -1
    , 'Techlist has items in it'

casper.thenOpen singleUrl, ->
    currentUrl = @getCurrentUrl()
    @echo 'Refreshed, location is now ' + currentUrl, 'INFO'
    @echo 'From HTTP navigation', 'INFO_BAR'

    @test.assertEquals currentUrl, singleUrl, 'URL is the one expected'
    @test.assertExists '.btn-next', 'Next button exists'
    @test.assertExists '.btn-prev', 'Prev button exists'
    @test.assertExists '.btn-link', 'External Link button exists'
    @test.assertExists '.btn-back', 'Back button exists'
    @test.assertExists '.techList li', 'Tech list has a list item'
    @test.assertEval ->
        __utils__.findAll('.techList li').length >= -1
    , 'Techlist has items in it'

# Light the fuse
casper.run ->
    @exit()
