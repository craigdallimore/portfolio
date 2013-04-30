App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.Projects = Marionette.CompositeView.extend(
        _.extend({}, App.Mixin.Navigation, {

        tagName: 'section',
        className: 'projects',
        template: 'Projects',
        itemView: App.View.Tile,
        emptyView: App.View.TileEmpty,
        itemViewContainer: '.tileList',

        events: {
            'click nav a': 'navigate'
        },

        initialize: function(options) {

            App.vent.on('item:resized', _.bind(this.reLayout, this));

            if (! this.collection.length ) {
                this.collection.fetch({
                    success: _.bind(this.deferMasonry, this)
                });
                return;
            }

            if (options.DOMExists) {
                this.bindList();
                this.masonify();
            } else {
                this.deferMasonry();
            }
        },

        bindList: function() {

            var collection = this.collection;

            this.$el.find('.tileList').children().map( function(idx, el) {

                var id = $(el).attr('data-project-id'),
                    model = collection.get(id),
                    view = new App.View.Tile({
                        el: el,
                        model: model
                    });
            });
        },

        reLayout: function() {
            this.$el.find('.tileList').isotope('reLayout');
        },

        masonify: function() {
            this.$el.find('.tileList').isotope({
                itemSelector: 'li',
                layoutMode: 'masonry',
                masonry: {
                    columnWidth: 110
                }
            });
            this.$el.find('.tileList').children().each(this.animateIn);
        },

        deferMasonry: function() {
            _.defer(function(self) {
                self.masonify();
            }, this);
        },

        animateIn: function(idx, child) {
            setTimeout(function() {
                $(child).find('.tile').removeClass('transformed');
            }, idx * 80);
        },

        renderModel: function() {
            return App.Tmpl[this.template]();
        },

        onClose: function() {
            App.vent.off('item:resized');
        }
    }));

});
