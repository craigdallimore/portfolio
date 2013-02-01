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

App.vent.on('canvas:height', function(height) {
    $('#canvas').css({'height': height + 50});
});
App.vent.on('canvas:removeheight', function() {
    $('#canvas').removeAttr('style');
});
$(document).ready(function(){
    App.start();
});
