App.module('View', function(View, App, Backbone, Marionette, $, _) {
    View.Project = App.View.AnimationView.extend({
        tagName: 'section',
        className: 'project',
        template: 'Project',

        events: {
            'click .btn-back': 'navigateBack',
            'click .btn-prev': 'navigatePrev',
            'click .btn-next': 'navigateNext'
        },

        setSize: function() {

            var self = this,
                img = this.$el.find('img'),
                src = $(img).attr('src'),
                $img = $('<img>', { src: src });

            $img.load(function() {
                var height = self.$el.outerHeight();
                App.vent.trigger('canvas:height', height);
            });
        },

        animate: function() {
            this.$el.find('.projectTransformed').removeClass('projectTransformed');
        },

        navigateBack: function(e) {
            e.preventDefault();
            var path = (e.target.tagName === 'SPAN') ?
                $(e.target).parent().attr('href') :
                $(e.target).attr('href');
            App.vent.trigger('navigate', path, {trigger: true});
        },

        navigateNext: function(e) {
            e.preventDefault();
            var model = this.model;
            var label = this.model.collection.next(model).get('label');
            App.vent.trigger('navigate', '/projects/' + label, {trigger: true});
        },

        navigatePrev: function(e) {
            e.preventDefault();
            var model = this.model;
            var label = this.model.collection.prev(model).get('label');
            App.vent.trigger('navigate', '/projects/' + label, {trigger: true});
        },

        render: function() {
            var json = this.model.toJSON();
            json.dictionary = App.Data.TechDictionary();

            var html = App.Tmpl[this.template](json);
            var self = this;

            this.$el.html(html);
            _.defer(function() {
                self.animate();
                self.setSize();
                self.animateList('.transformed', 150);
            });
        }
    });
});
