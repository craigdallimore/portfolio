App.module('View', function(View, App, Backbone, Marionette, $, _) {
    View.Header = Marionette.ItemView.extend({
        tagName: 'hgroup',
        template: 'Header',

        initialize: function() {
            var title = this.model.get('title');
            App.vent.trigger('title:change', title);
        },

        render: function() {
            var self = this;
            var json = this.model.toJSON();
            var html = App.Tmpl[this.template](json);
            this.$el.html(html);
            _.defer( function() {
                self.$el.find('.titleTransformed').removeClass('titleTransformed');
                self.$el.find('.subTitleTransformed').removeClass('subTitleTransformed');
            });
        }
    });
});
