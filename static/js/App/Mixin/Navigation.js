App.module('Mixin', function(Mixin, App, Backbone, Marionette, $, _ ) {

    Mixin.Navigation = {

        navigate: function(e) {

            e.preventDefault();

            var path = (e.target.tagName === 'SPAN') ?
                $(e.target).parent().attr('href') : $(e.target).attr('href');
            App.vent.trigger('navigate', path, { trigger: true});

        }


    };

});
