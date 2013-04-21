App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.Row = Marionette.ItemView.extend({
        tagName: 'tr',
        template: 'BookRow',
        render: function() {
            var json = this.model.toJSON();
            var html = App.Tmpl[this.template](json);
            this.$el.html(html);
        }
    });

});
