App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.About = App.View.AnimationView.extend({
        tagName: 'section',
        className: 'about',
        template: 'About',

        events: {
            'click .btn-go': 'navigate'
        },

        navigate: function(e) {
            e.preventDefault();
            var path;
            if(e.target.tagName === 'SPAN') {
                path = $(e.target).parent('a').attr('href');
            } else {
               path =  $(e.target).attr('href');
            }
            App.vent.trigger('navigate', path, {trigger: true});
        },

        initialize: function(options) {

            if (!options.DOMExists) {
                this.renderSubViews();
            }

            App.vent.trigger('canvas:removeheight');
        },

        renderSubViews: function() {

            var self = this;

            App.addRegions({
                profile:     '#canvas .profile',
                networkList: '#canvas .networkList',
                bookList:    '#canvas .bookList',
                techList:    '#canvas .about .techList'
            });

            _.defer(function() {
                self.renderProfile();
                self.renderNetworks();
                self.renderBooks();
                self.renderTech();
                self.animateList('h2', 150);
                self.subViewsOpen = true;
            });

        },

        close: function() {
            if ( this.subViewsOpen ) {
                App.profile.close();
                App.networkList.close();
                App.bookList.close();
                App.techList.close();
            }
            App.vent.off('profile:ready');
        },

        renderProfile: function() {

            if(!App.ProfileModel) {
                App.ProfileModel = new App.Model.Profile();
            }

            var profileView = new App.View.Profile({ model: App.ProfileModel  });

            App.vent.on('profile:ready', function() {
                App.profile.show(profileView);
            });

        },

        renderNetworks: function() {

            if(!App.NetworkCollection) {
                App.NetworkCollection = new App.Collection.Network();
            }

            var networkList = new App.View.NetworkList({
                collection: App.NetworkCollection,
                itemView: App.View.Network
            });

            App.networkList.show(networkList);

        },

        renderBooks: function() {

            if(!App.BookCollection) {
                App.BookCollection = new App.Collection.Book();
            }

            var bookList = new App.View.BookList({
                collection: App.BookCollection,
                itemView: App.View.Book
            });

            App.bookList.show(bookList);

        },

        renderTech: function() {

            if(!App.TechCollection) {
                App.TechCollection = new App.Collection.Tech();
            }

            var techList = new App.View.TechList({
                collection: App.TechCollection,
                itemView: App.View.Tech
            });

            App.techList.show(techList);
        },


        render: function() {
            var self = this;
            var html = App.Tmpl[this.template]();
            this.$el.html(html);
        }
    });
});
