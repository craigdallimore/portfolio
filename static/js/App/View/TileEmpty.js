App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.TileEmpty = Marionette.ItemView.extend({

        tagName: 'li',
        template: 'TileEmpty',

        render: function() {
            var html = App.Tmpl[this.template]();
            this.$el.html(html);
        }

    });

});
