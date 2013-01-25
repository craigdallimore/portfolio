App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.AnimationView = Marionette.View.extend({

        animateList: function(tagName, time) {
            var els = this.$el.find(tagName);
            els.each(function(i, el) {
                setTimeout(function(){
                    $(el).removeClass('transformed');
                }, i * time);
            });
        }
    });

    View.AnimationCollectionView = Marionette.CollectionView.extend({

        initialize: function() {
            var self = this;
            this.collection.fetch().done(function() {
                self.animateList('.transformed', 50);
            });
        },
        animateList: function(tagName, time) {
            var els = this.$el.find(tagName);
            els.each(function(i, el) {
                setTimeout(function(){
                    $(el).removeClass('transformed');
                }, i * time);
            });
        }
    });


});
