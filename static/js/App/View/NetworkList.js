App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.NetworkList = App.View.AnimationCollectionView.extend({
        tagName: 'ul',
        className: 'tipList'
    });

});
