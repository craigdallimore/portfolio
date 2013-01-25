App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.TechList = App.View.AnimationCollectionView.extend({
        tagName: 'ul',
        className: 'tipList'
    });

});
