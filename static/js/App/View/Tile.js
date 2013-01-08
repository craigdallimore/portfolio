App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.Tile = Marionette.ItemView.extend({
        tagName: 'li',
        template: 'TileItem',

        events: {
            'click .more': 'navigate',
            'click .enlarge': 'enlarge'
        },

        initialize: function() {
            this.setSize(1);
        },

        setSize: function(size) {
            var tileSizeRE = /\b(ts-\d)\b/g;
            var spriteRE = /\b(s-\w+-\dx\d)\b/g;
            var classes = this.$el[0].className;
            var newClasses = ' ts-' + size + ' s-' + this.model.get('label') + '-' + size + 'x' + size;

            // Clear old classes
            classes = classes.replace(spriteRE, '');
            classes = classes.replace(tileSizeRE, '');
            // Update with new classes
            this.$el[0].className = classes + newClasses;
            this.size = size;
        },

        getRandomSize: function() {
            var rnd = Math.ceil(Math.random() * 10);
            var num = 1;
            if ( rnd > 5 ) num = 2;
            if ( rnd > 9 ) num = 3;
            return num;
        },

        render: function() {
            var json = this.model.toJSON();
            var html = App.Tmpl[this.template](json);
            this.$el.html(html);
        },

        navigate: function(e) {
            e.preventDefault();

            var path =  '/projects/' + this.model.get('label');
            App.vent.trigger('navigate', path, {trigger: true});
        },

        enlarge: function(e) {
            e.preventDefault();
            this.setSize((this.size === 3) ? 1 : 3);
            App.vent.trigger('item:enlarged', this.model);
        }
    });

});