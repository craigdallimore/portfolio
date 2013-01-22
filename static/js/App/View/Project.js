App.module('View', function(View, App, Backbone, Marionette, $, _) {
    View.Project = Marionette.View.extend({
        tagName: 'section',
        className: 'projectDetails',
        template: 'Project',

        initialize: function() {},

        animate: function() {

            this.$el.find('.transformed').removeClass('transformed');
            this.$el.find('.techList li').each(function(i, li) {
                var time = i * 150;
                setTimeout(function() {
                    $(li).removeClass('techTransformed');
                }, time);
            });
        },

        render: function() {
            var json = this.model.toJSON();
            json.dictionary = App.Data.TechDictionary();

            var html = App.Tmpl[this.template](json);
            var self = this;

            this.$el.html(html);
            _.defer(function() {
                self.animate();
            });
        }
    });
});
