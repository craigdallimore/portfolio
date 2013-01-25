App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.Tech = Marionette.ItemView.extend({
        tagName: 'li',
        template: 'TechItem',

        render: function() {
            var json = this.model.toJSON();
            var html = App.Tmpl[this.template](json);
            var label = this.model.get('label');
            this.$el.html(html).addClass('transformed s-logo-' + label);
        }
   });

});
