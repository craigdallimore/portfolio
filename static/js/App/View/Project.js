App.module('View', function(View, App, Backbone, Marionette, $, _) {
    View.Project = Marionette.View.extend({
        tagName: 'section',
        className: 'projectDetails',
        template: 'Project',

        initialize: function() {},

        render: function() {
            var json = this.model.toJSON();
            var html = App.Tmpl[this.template](json);
            var self = this;
            this.$el.html(html);
            _.defer(function() {
                self.$el.find('.transformed').removeClass('transformed');
            });
        }
    });
});
