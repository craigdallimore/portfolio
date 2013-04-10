###
Mocha / Chai test
prerequisites:
    mocha testrunner
    chai assertion library
    server is running on port 3000
    db is opened
###

url = 'http://localhost:3000/api/'
http = require 'request'
chai = require '../../node_modules/chai/chai'
assert = chai.assert
expect = chai.expect
should = chai.should()

describe 'API/book', ->
    path = url + 'book/'
    itemName = 'book'
    testResource = {}
    mockResource =
        title: "JavaScript: The Good Parts",
        author: "Douglas Crockford",
        link: "http://www.amazon.com/gp/product/B0026OR2ZY",
        label: "goodparts"
    mockUpdate =
        title: "The Pragmatic Programmer: From Journeyman to Master",
        author: "Andrew Hunt, David Thomas",
        link: "http://www.amazon.com/gp/product/B000SEGEKI",
        label: "pragmatic"
    incomplete =
        title: "The Pragmatic Programmer: From Journeyman to Master",
        author: "Andrew Hunt, David Thomas",

    # TODO authentication
    #
    # ok so what does this even mean?
    # Send an email/key and log in?
    # How do sessions work in node?
    # I want to log in, then successfully use the api
    # Password should just be an envirnoment variable
    # SO RAD
    # 1. Create log in form
    # 2. Create new user (up to ONE, hah)
    # 3. User can log in / log out
    # 4. Only a logged in user can upload / delete / put to the api
    #
    #
    #
    # TODO sanitization
    # ok so everything that is input must be sanitized
    # no script tags
    # no angle brackets

    describe 'POST a new ' + itemName, ->

        it 'should be successful', (done) ->

            http.post
                url: path
                form: mockResource
                (err, res, body) ->
                    if err
                        done err

                    result = JSON.parse body
                    testResource = result
                    res.statusCode.should.be.equal 201

                    for own prop of mockResource
                        result.should.have.property prop

                    done()

        it 'should reject incomplete/invalid data', (done) ->

            http.post
                url: path
                form: incomplete
                (err, res, body) ->
                    if err
                        done err

                    res.statusCode.should.be.equal 400
                    done()


    describe 'UPDATE a ' + itemName, ->

        it 'should be successful', (done) ->

            http.put
                url: path + testResource._id,
                form: mockUpdate
                (err, res, body) ->
                    if err
                        done err

                    result = JSON.parse body
                    res.statusCode.should.be.equal 201

                    for own prop of mockUpdate
                        result[prop].should.be.equal(mockUpdate[prop])

                    done()

        it 'should reject incomplete/invalid data', (done) ->
            http.put
                url: path + testResource._id,
                form: incomplete
                (err, res, body) ->
                    if err
                        done err

                    res.statusCode.should.be.equal 400
                    done()

        it 'should reject ids that do not exist', (done) ->
            http.put
                url: path + '1337/',
                form: mockUpdate
                (err, res, body) ->
                    if err
                        done err

                    res.statusCode.should.be.equal 404
                    done()

    describe 'GET all ' + itemName + 's', ->
        it 'should be successful', (done) ->
            http.get
                url: path
                (err, res, body) ->
                    if err
                        done err

                    res.statusCode.should.be.equal(200)
                    should.exist body
                    results = JSON.parse body
                    results.should.be.an 'array'
                    done()

    describe 'GET a ' + itemName + ' by id', ->
        it 'should be successful', (done) ->
            http.get
                url: path + testResource._id
                (err, res, body) ->
                    if err
                        done err

                    res.statusCode.should.be.equal(200)
                    should.exist body
                    result = JSON.parse body
                    result.should.be.an 'object'

                    for own prop of mockResource
                        result.should.have.property prop

                    for own prop of mockUpdate
                        result[prop].should.be.equal(mockUpdate[prop])

                    done()


        it 'should not work for invalid ids', (done) ->
            http.get
                url: path + '1337/'
                (err, res, body) ->
                    if err
                        done err

                    res.statusCode.should.be.equal(404)
                    done()

    describe 'DELETE a ' + itemName + ' by id', ->
        it 'should be successful', (done) ->
            http.del
                url: path + testResource._id + '/'
                (err, res, body) ->
                    if err
                        done err

                    res.statusCode.should.be.equal(200)
                    should.exist body
                    profile = JSON.parse body
                    profile.should.be.an('object')
                    done()

        it 'should no longer exist', (done) ->
            http.get
                url: path + testResource._id + '/'
                (err, res, body) ->
                    if err
                        done err

                    res.statusCode.should.be.equal(404)
                    done()

        it 'should not work for invalid ids', (done) ->
            http.del
                url: path + '1337/'
                (err, res, body) ->
                    if err
                        done err

                    res.statusCode.should.be.equal(404)
                    done()

    describe 'DELETE all ' + itemName + 's', ->
        it 'should be successful', (done) ->
            http.del
                url: path
                (err, res, body) ->
                    if err
                        done err

                    res.statusCode.should.be.equal(200)
                    should.exist body
                    results = JSON.parse body
                    results.should.be.an('array')
                    results.length.should.be.equal(0)

                    done()

        it 'should remove all the ' + itemName + 's', (done) ->
            http.get
                url: path
                (err, res, body) ->
                    if err
                        done err

                    res.statusCode.should.be.equal(404)
                    done()
