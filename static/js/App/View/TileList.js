App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.TileList = Marionette.CompositeView.extend({

        tagName: 'ul',
        className: 'tileList',

        initialize: function() {

            this.collection.fetch({
                success: _.bind(this.masonify, this)
            });
            App.vent.on('item:enlarged', _.bind(this.reLayout, this));
       },

        reLayout: function() {
            this.$el.isotope('reLayout');
        },

        masonify: function() {
            this.$el.isotope({
                itemSelector: 'li',
                layoutMode: 'masonry',
                masonry: {
                    columnWidth: 110
                }
            });
            this.$el.children().each(this.fadeInChild);
        },

        fadeInChild: function(idx, child) {
            $(child).hide().fadeIn(idx * 100);
        },

        render: function() {},

        onClose: function() {
            App.vent.off('item:enlarged');
        }

    });


});
