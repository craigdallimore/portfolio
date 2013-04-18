window.App = new Backbone.Marionette.Application();

App.addRegions({
    canvas: '#canvas',
    modal: '#modal',
    header: '#header',
    footer: '#footer'
});

App.vent.on('title:change', function(title) {
    document.title = title;
});
App.vent.on('start', function() {
    App.Routing.start();
});

$(document).ready(function() {
    App.start();
});
