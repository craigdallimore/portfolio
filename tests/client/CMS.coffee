casper = require('casper').create()
dummyUser = require('./tests/dummy/user').user
dummyBook = require('./tests/dummy/book').dummyBook
updateBook = require('./tests/dummy/book').updateBook
baseUrl = 'http://localhost:3000/'
loginUrl = baseUrl + 'login'
logoutUrl = baseUrl + 'logout'
url = baseUrl + 'cms/'

num_rows = 0
updated_num_rows = 0

# Testing login / logout of CMS
###############################
casper.start logoutUrl, ->
    currentUrl = @getCurrentUrl()

    @echo 'CMS LOGIN/LOGOUT', 'INFO_BAR'
    @test.assertEqual currentUrl, baseUrl, 'URL is the one expected'

casper.thenOpen url, ->
    currentUrl = @getCurrentUrl()

    @test.info 'Navigated to CMS - should be redirected to /login'
    @test.assertEquals loginUrl, currentUrl, 'URL is the one expected'
    @test.assertTitle 'Log In', 'Page title is Login'

    @fill '.form-login',
        email: dummyUser.email
        password: dummyUser.password
    , true

casper.then ->
    currentUrl = @getCurrentUrl()

    @test.info 'Submitted login form, url is ' + currentUrl
    @test.assertEquals url, currentUrl, 'URL is the one expected'
    @test.assertTitle 'CMS', 'Page title is CMS'
    @test.assertTextExists 'apikey', 'API key is shown'

    @test.assertExists 'a[href="/logout"]', 'A log out button should be available'
    @click 'a[href="/logout"]'

    @test.info 'Logging out'
casper.then ->
    currentUrl = @getCurrentUrl()
    @test.assertEqual currentUrl, baseUrl, 'URL is the one expected'

    @test.info 'Logging in'
casper.thenOpen url, ->
    @fill '.form-login',
        email: dummyUser.email
        password: dummyUser.password
    , true

# Testing Book creation
#######################
casper.then ->
    @echo 'BOOK CREATION', 'INFO_BAR'
    @test.assertExists '#bookTable', 'A table of books is present'

    @test.assertExists '.form-new-book', 'A new book form exists'
    @test.assertExists '.form-new-book input[name="title"]', 'A title input is present'
    @test.assertExists '.form-new-book input[name="author"]', 'An author input is present'
    @test.assertExists '.form-new-book input[name="link"]', 'A link input is present'
    @test.assertExists '.form-new-book input[name="label"]', 'A label input is present'
    num_rows = @evaluate ->
        __utils__.findAll('#bookTable tbody tr').length

    @test.info 'Submit a new book'
    @fill '.form-new-book',
        title: dummyBook.title
        author: dummyBook.author
        link: dummyBook.link
        label: dummyBook.label
    , false
casper.then ->
    @click '.form-new-book input[type="submit"]'

casper.then ->
    currentUrl = @getCurrentUrl()

    @test.info 'Submitted new book form, url is ' + currentUrl
    @test.assertEquals currentUrl, url, 'URL is the one expected'
    @test.assertTitle 'CMS', 'Page title is CMS'

    updated_num_rows = @evaluate ->
        __utils__.findAll('#bookTable tbody tr').length

    @test.assertNotEquals num_rows, updated_num_rows, 'The number of rows of books should change'

    @test.assertEval ->
        __utils__.findAll('#bookTable tbody tr').length > 0
    , 'There are book items in the table'

casper.then ->
    @test.assertField 'title', '', 'Title field has been emptied'
    # TODO: Investigate possible bug with CasperJS formSelector - this is a workaround
    @test.assertEvalEquals ->
        __utils__.findOne('input[name="author"]').value
    , '', 'Author field has been emptied'
    @test.assertField 'link', '', 'Link field has been emptied'
    @test.assertField 'label', '', 'Label field has been emptied'

    # incomplete book info wont result in a book being created
    num_rows = @evaluate ->
        __utils__.findAll('#bookTable tbody tr').length

    @click '.form-new-book input[type="submit"]'

casper.then ->
    updated_num_rows = @evaluate ->
        __utils__.findAll('#bookTable tbody tr').length

    @test.assertEquals num_rows, updated_num_rows, 'Submitting with missing information should not create a new item'
    @test.assertTextExists 'This field is required', 'Error messages should be shown'

    @test.info 'Submit a book with incomplete informations'
    @fill '.form-new-book',
        title: dummyBook.title
        author: dummyBook.author
        link: dummyBook.link
        label: dummyBook.label

    @click '.form-new-book input[type="submit"]'

    # a toast message should show when an async operation completes
    # a spinner should show during async operation

# Testing Book updating
#######################
casper.then ->
    @echo 'BOOK UPDATING', 'INFO_BAR'
    @test.assertExists '#bookTable tbody tr:first-child .edit', 'Edit buttons should exist'
    @click '#bookTable tbody tr .edit'

    @test.assertExists '#bookTable tbody tr:first-child input', 'Clicking the edit button should change the template'
    @test.assertExists '#bookTable tbody tr:first-child .update', 'An update button should exist'

    @click '#bookTable tbody tr:first-child .update'

    @test.assertExists '#bookTable tbody tr:first-child .edit', 'Clicking the update button will change the template back'
    @test.info 'Setting first row back to edit mode'
    @click '#bookTable tbody tr:first-child .edit'


    @test.info 'Updating first row to "updateBook" info'
    @fill '#bookTable tbody tr:first-child',
        title: updateBook.title
        author: updateBook.author
        link: updateBook.link
        label: updateBook.label

    @click '#bookTable tbody tr:first-child .update'

    @test.assertTextExists updateBook.title, 'Row has been updated'

    @click '#bookTable tbody tr:first-child .edit'

    @test.info 'Updating a book with incomplete information'

    @fill '#bookTable tbody tr:first-child',
        title: updateBook.title
        author: updateBook.author
        link: updateBook.link
        label: ''

    @click '#bookTable tbody tr:first-child .update'

    @test.assertTextExists 'This field is required'
    @test.assertExists '#bookTable tbody tr:first-child .update', 'The row should still be in edit mode'

    @test.assertExists '#bookTable tbody tr:first-child .undo', 'There should be an undo button'

    @click '#bookTable tbody tr:first-child .undo'
    @test.assertExists '#bookTable tbody tr:first-child .edit', 'Clicking the undo button will change the template back'
    @test.assertTextExists updateBook.label, 'The row should revert correctly'


    # user should be able to see a toast message confirming the async has completed
    # user should be able to cancel updates

# Testing Book deletion
#######################
    @echo 'BOOK DELETION', 'INFO_BAR'
    num_rows = @evaluate ->
        __utils__.findAll('#bookTable tbody tr').length

    @echo 'Number of books: ' + num_rows
    @test.assertExists '#bookTable tbody tr:first-child .remove', 'A remove button should exist on a book row'
    @click '#bookTable tbody tr:first-child .remove'

    updated_num_rows = @evaluate ->
        __utils__.findAll('#bookTable tbody tr').length
    @echo 'Clicked remove, updated number of books: ' + updated_num_rows

    @test.assertNotEquals num_rows, updated_num_rows, 'The number of rows of books should change'


    # user can create tech
    # user can read tech
    # user can update tech
    # user can delete tech

    # user can create projects
    # user can read projects
    # user can update projects
    # user can delete projects

    # user can create networks
    # user can read networks
    # user can update networks
    # user can delete networks

    # user can delete their account

    # NEW BEHAVIOURS

    # user can create new posts in markdown
    # user can read a list of posts
    # user can update a post
    # user can delete a post

# Light the fuse
casper.run ->
    @exit()
