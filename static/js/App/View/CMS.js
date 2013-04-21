App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.CMS = Marionette.Layout.extend({

        regions: {
            bookTable: '#bookTable'
        },

        initialize: function(options) {
            if (options.DOMExists) {
                _.defer(function(self) {
                    var bcv = new App.View.ResourceManager({
                        el: $('#bookTable'),
                        itemView: App.View.Row,
                        collection: App.BookCollection
                    });
                    self.bookTable.attachView(bcv);
                }, this);

            }
        }
    });

});
