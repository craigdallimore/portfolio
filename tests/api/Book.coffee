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
    # TODO sanitization

    describe 'POST a new ' + itemName, ->

        it 'should return an error if the user is not logged in', (done) ->
            http.post
                url: path
                form: mockResource
                (err, res, body) ->
                    if err
                        done err

                    result = JSON.parse body
                    res.statusCode.should.be.equal 403

                    done()

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
