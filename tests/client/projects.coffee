# casperjs tests
# prerequisites:
#    phantomjs
#    casperjs
#    server is running on port 3000
#    db is opened

casper = require('casper').create()
baseUrl = 'http://localhost:3000/'
url = baseUrl + 'projects/'

casper.start url, ->
    currentUrl = @getCurrentUrl()
    expectedUrl = baseUrl + 'projects/'

    @echo 'From HTTP Naviagation: ', 'INFO_BAR'
    @test.assertTitle 'Projects', 'The title is "Projects"'
    @test.assertEquals currentUrl, expectedUrl, 'URL is the one expected'
    @test.assertExists '.projects', 'Projects list exists'
    @test.assertEval ->
        __utils__.findAll('.tileList li').length >= 1
    , 'Projects list has items in it'


    @test.assertExists '.btn-enlarge', 'Enlarge button exists'
    @test.assertExists '.btn-shrink', 'Shrink button exists'
    @test.assertExists '.btn-more', 'More button exists'
    @test.assertExists '.btn-external', 'External button exists'

    className = @evaluate ->
        __utils__.findOne('.tileList li:first-child').getAttribute 'class'

    @test.assert !!className.match('ts-1'), 'First tile is using the 1X1 CSS class'
    @click '.tileList li:first-child .btn-enlarge'

    className = @evaluate ->
        __utils__.findOne('.tileList li:first-child').getAttribute 'class'

    @test.assert !!className.match('ts-3'), 'Clicking the enlarge button should make the tile 3x3'
    @click '.tileList li:first-child .btn-shrink'

    className = @evaluate ->
        __utils__.findOne('.tileList li:first-child').getAttribute 'class'

    @test.assert !!className.match('ts-1'), 'Clicking the shrink button should make the tile 1x1'

# Clicking external should take to external link
    href = @evaluate ->
        __utils__.findOne('.tileList li:first-child .btn-external').getAttribute 'href'

    #    @click '.tileList li:first-child .btn-external'
#casper.waitForPopup /thekaizenproject.com/, ->
#    @test.assetEquals @popups.length, 1

casper.then ->
    href = @evaluate ->
        __utils__.findOne('.tileList li:first-child .btn-more').getAttribute 'href'
    @click '.tileList li:first-child .btn-more'
    currentUrl = @getCurrentUrl()
    expectedUrl = baseUrl + href.substr 1

    @echo 'Clicked "more" button, location is now ' + currentUrl, 'INFO'
    @test.assertEquals currentUrl, expectedUrl, 'URL is the one expected'
    @back()

casper.then ->
    currentUrl = @getCurrentUrl()
    @echo 'Navigated back, location is now ' + currentUrl, 'INFO'
    @test.assertExist 'a[href="/about/"]', 'About button exists'
    @click 'a[href="/about/"]'

casper.then ->
    currentUrl = @getCurrentUrl()
    expectedUrl = baseUrl + 'about/'

    @echo 'Clicked about link, location is now ' + currentUrl, 'INFO'

    @test.assertEquals currentUrl, expectedUrl, 'URL is the one expected'
    @back()

casper.then ->
    currentUrl = @getCurrentUrl()
    expectedUrl = baseUrl + 'projects/'

    @echo 'Navigated back, location is now ' + currentUrl, 'INFO'
    @echo 'From SPA Navigation:', 'INFO_BAR'

    @test.assertTitle 'Projects', 'The title is "Projects"'
    @test.assertEquals currentUrl, expectedUrl, 'URL is the one expected'

    @test.assertExists '.projects', 'Projects list exists'
    @test.assertEval ->
        __utils__.findAll('.tileList li').length >= 1
    , 'Projects list has items in it'

    @test.assertExists '.btn-enlarge', 'Enlarge button exists'
    @test.assertExists '.btn-shrink', 'Shrink button exists'
    @test.assertExists '.btn-more', 'More button exists'
    @test.assertExists '.btn-external', 'External button exists'

# Light the fuse
casper.run ->
    @exit()
