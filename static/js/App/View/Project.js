App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.Project = App.View.AnimationView.extend(
        _.extend({}, App.Mixin.Navigation, {

        tagName: 'section',
        className: 'project',
        template: 'Project',

        events: {
            'click .btn-back': 'navigate',
            'click .btn-prev': 'navigatePrev',
            'click .btn-next': 'navigateNext'
        },

        animate: function() {
            this.$el.find('.projectTransformed').removeClass('projectTransformed');
            return this;
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

                self.animate()
                    .animateList('.transformed', 150);

            });
        }
    }));
});
