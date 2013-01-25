App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.Network = Marionette.ItemView.extend({
        tagName: 'li',
        template: 'NetworkItem',
        render: function() {
            var json = this.model.toJSON();
            var html = App.Tmpl[this.template](json);
            this.$el.html(html).addClass('transformed');
        }
    });

});
