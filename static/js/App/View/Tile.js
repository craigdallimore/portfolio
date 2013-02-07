App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.Tile = Marionette.ItemView.extend({
        tagName: 'li',
        template: 'TileItem',

        events: {
            'click .more': 'navigate',
            'click .enlarge': 'enlarge',
            'click .shrink': 'shrink'
        },

        initialize: function() {
            var spriteClass = 's-' + this.model.get('label') + '-1x1';
            this.$el.addClass('ts-1 ' + spriteClass);
            this.spriteClass = spriteClass;
        },

        shrink: function(e) {
            e.preventDefault();

            var spriteClass = this.spriteClass;
            this.$el.removeClass('ts-3').addClass('ts-1 ' + spriteClass);
            this.$el.find('img').remove();
            App.vent.trigger('item:resized', this.model);
        },

        enlarge: function(e) {
            e.preventDefault();

            var imgPath = '/static/img/3x3/' + this.model.get('label') + '-3x3.png',
                $img = $('<img>', { src: imgPath }),
                spriteClass = this.spriteClass;

            this.$el.removeClass('ts-1 ' + spriteClass).addClass('ts-3');
            this.$el.find('.info').before($img);
            App.vent.trigger('item:resized', this.model);
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
        }

    });

});
