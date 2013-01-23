App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.BookList = Marionette.CollectionView.extend({
        tagName: 'ul',
        className: 'tipList',
        initialize: function() {
            this.collection.fetch();
        }
    });

});
