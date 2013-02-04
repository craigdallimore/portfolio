var assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

describe("App", function() {

    it("is in the window namespace", function() {
        expect(window).to.have.property('App');
    });

});

describe("Profile", function() {

    var profile = new App.Model.Profile();

    it("should be loaded from the server", function(done) {
        profile.fetch({
            success: function() {
                done();
            }
        });
    });

    it("has a first name", function() {
        var firstname = profile.get('firstname');
        expect(profile).to.have.property('firstname');
    });
    it("should be Craig", function() {
        expect(profile.firstname).to.deep.equal('Craig');
    });

});
