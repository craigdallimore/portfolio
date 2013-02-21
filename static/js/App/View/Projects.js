App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.Projects = Marionette.CompositeView.extend(
        _.extend({}, App.Mixin.Navigation, {

        tagName: 'section',
        className: 'projects',
        template: 'Projects',
        itemViewContainer: '.tileList',
        events: {
            'click nav a': 'navigate'
        },

        initialize: function(options) {

            App.vent.on('item:resized', _.bind(this.reLayout, this));

            if (! options.DOMExists) {

                if (this.collection.length) {
                    _.defer(function(self) { self.renderList();  }, this);
                    return;
                }

                this.collection.fetch({
                    success: _.bind(this.renderList, this),
                    silent: true
                });
                return;
            }

            var projectsJSON = App.Data.Projects();
            this.collection.reset(projectsJSON);

            _.defer(function(self) {
                self.bindList();
                self.masonify();
            }, this);
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

        renderList: function() {
            this.renderCollection();
            this.masonify();
        },

        reLayout: function() {
            this.$el.find('.tileList').isotope('reLayout');
        },

        masonify: function() {
            var self = this;
            this.$el.find('.tileList').isotope({
                itemSelector: 'li',
                layoutMode: 'masonry',
                masonry: {
                    columnWidth: 110
                }
            });
            this.$el.find('.tileList').children().each(this.animateIn);
        },

        animateIn: function(idx, child) {
            setTimeout(function() {
                $(child).find('.tile').removeClass('transformed');
            }, idx * 80);
        },

        render: function() {
            var html = App.Tmpl[this.template]();
            this.$el.html(html);
        },

        onClose: function() {
            App.vent.off('item:resized');
        }
    }));

});
