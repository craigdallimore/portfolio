App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.Tile = Marionette.ItemView.extend({
        tagName: 'li',
        template: 'TileItem',

        events: {
            'click .btn-more': 'navigate',
            'click .btn-enlarge': 'enlarge',
            'click .btn-shrink': 'shrink'
        },

        initialize: function() {
            this.$el.addClass('ts-1');
        },

        shrink: function(e) {
            e.preventDefault();

            this.$el.removeClass('ts-3').addClass('ts-1');
            this.$el.find('img').remove();
            App.vent.trigger('item:resized', this.model);
        },

        enlarge: function(e) {
            e.preventDefault();

            var imgPath = '/static/img/3x3/' + this.model.get('label') + '-3x3.png',
                $img = $('<img>', { src: imgPath });

            this.$el.removeClass('ts-1').addClass('ts-3');
            this.$el.find('.info').before($img);

            App.vent.trigger('item:resized', this.model);
        },

        render: function() {
            var json = this.model.toJSON();
            var html = App.Tmpl[this.template](json);

            this.$el.html(html).find('.front').addClass('s-' + this.model.get('label') + '-1x1');
        },

        navigate: function(e) {
            e.preventDefault();
            var path =  '/projects/' + this.model.get('label');
            App.vent.trigger('navigate', path, {trigger: true});
        }

    });

});
