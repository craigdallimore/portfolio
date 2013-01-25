App.module('View', function(View, App, Backbone, Marionette, $, _) {

    var animateList = function(selector, time) {
        var els = this.$el.find(selector);
        els.each(function(i, el) {
            setTimeout(function() {
                $(el).removeClass('transformed');
            }, i * time);
        });
    };

    View.AnimationView = Marionette.View.extend({
        animateList: animateList
    });

    View.AnimationCollectionView = Marionette.CollectionView.extend({

        initialize: function() {
            var self = this;
            this.collection.fetch().done(function() {
                self.animateList('.transformed', 50);
            });
        },
        animateList: animateList
    });


});
