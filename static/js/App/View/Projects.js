App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.Projects = Marionette.CompositeView.extend({

        template: 'Projects',
        itemViewContainer: '.tileList',
        tagName: 'section',
        className: 'projects',
        events: {
            'click nav a': 'navigate'
        },

        initialize: function() {

            App.vent.on('item:resized', _.bind(this.reLayout, this));
            App.vent.trigger('canvas:removeheight');

            if(this.collection.length) {
                _.defer(function(self) { self.renderList(); }, this);
                return;
            }

            this.collection.fetch({
                success: _.bind(this.renderList, this),
                silent: true
            });
       },

        navigate: function(e) {

            e.preventDefault();

            var path = (e.target.tagName === 'SPAN') ?
                $(e.target).parent().attr('href') :
                $(e.target).attr('href');

            App.vent.trigger('navigate', path, { trigger: true});

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
            App.vent.off('item:enlarged');
        }

    });


});
