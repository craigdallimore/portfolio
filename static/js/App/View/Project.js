App.module('View', function(View, App, Backbone, Marionette, $, _) {
    View.Project = App.View.AnimationView.extend({
        tagName: 'section',
        className: 'projectDetails',
        template: 'Project',

        animate: function() {
            this.$el.find('.projectTransformed').removeClass('projectTransformed');
        },

        render: function() {
            var json = this.model.toJSON();
            json.dictionary = App.Data.TechDictionary();

            var html = App.Tmpl[this.template](json);
            var self = this;

            this.$el.html(html);
            _.defer(function() {
                self.animate();
                self.animateList('.transformed', 150);
            });
        }
    });
});
