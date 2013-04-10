App.module('Model', function(Model, App, Backbone, Marionette, $, _) {
    Model.Project = Backbone.Model.extend({
        idAttribute: "_id"
    });
});
