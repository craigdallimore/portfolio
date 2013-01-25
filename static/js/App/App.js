window.App = new Backbone.Marionette.Application();

App.addRegions({
    canvas: '#canvas',
    modal: '#modal',
    header: '#header'
});

App.vent.on('title:change', function(title) {
    $('title').text(title);
});

App.vent.on('canvas:height', function(height) {
    $('#canvas').animate({'height': height + 50}, 400);
});

App.start();
