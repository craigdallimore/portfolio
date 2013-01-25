App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.BookList = App.View.AnimationCollectionView.extend({
        tagName: 'ul',
        className: 'tipList'
    });

});
