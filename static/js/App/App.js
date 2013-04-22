window.App = new Backbone.Marionette.Application();

App.addRegions({
    canvas: '#canvas',
    header: '#header'
});

App.vent.on('title:change', function(title) {
    document.title = title;
});
App.vent.on('start', function() {
    App.Routing.start();
});

App.bootstrapped = false;

$(document).ready(function() {
    App.start();
});
