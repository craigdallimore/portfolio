window.App = new Backbone.Marionette.Application();

App.addRegions({
    canvas: '#canvas',
    modal: '#modal',
    header: '#header'
});

App.vent.on('title:change', function(title) {
    $('title').text(title);
});

App.start();
