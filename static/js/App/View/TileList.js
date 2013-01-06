App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.TileList = Marionette.CompositeView.extend({

        tagName: 'ul',
        className: 'tileList',

        initialize: function() {
            this.collection.fetch({
                success: _.bind(this.onFetched, this)
            });

            App.vent.on('item:enlarged', _.bind(this.reLayout, this));
        },

        reLayout: function() {
            this.$el.isotope('reLayout');
        },

        onFetched: function() {
            this.$el.isotope({
                itemSelector: 'li',
                layoutMode: 'masonry',
                masonry: {
                    columnWidth: 110
                }
            });
            //TODO: use this when SEO and accessability concerns are resolved.
            //this.$el.children().each(this.fadeInChild);
        },

        fadeInChild: function(idx, child) {
            $(child).hide().fadeIn(idx * 200);
        },

        render: function() {}

    });


});