App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.Book = Marionette.ItemView.extend({
        tagName: 'li',
        template: 'BookItem',
        render: function() {
            var json = this.model.toJSON();
            var html = App.Tmpl[this.template](json);
            this.$el.html(html).addClass('transformed');
        }
    });

});
