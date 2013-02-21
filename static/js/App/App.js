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

$(document).ready(function(){
    App.start();
});
