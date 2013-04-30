module.exports = function(grunt) {

    var STATIC = 'static/';

    // Project config
    grunt.initConfig({
        dirs: {
            dist:       './static/dist/',
            js:         './static/js/',
            app:        './static/js/App/',
            mixin:      './static/js/App/Mixin/',
            collection: './static/js/App/Collection/',
            model:      './static/js/App/Model/',
            view:       './static/js/App/View/',
            controller: './static/js/App/Controller/',
            base:       './static/css/base/',
            layout:     './static/css/layout/',
            modules:    './static/css/modules/',
            css:        './static/css/',
            templates:  './static/templates/'
        },
        concat: {
            js: {
                src: [
                    '<%= dirs.js %>libs/backbone.collection.iterator.js',
                    '<%= dirs.js %>libs/jquery.isotope.min.js',
                    '<%= dirs.js %>mixin.js',
                    '<%= dirs.app %>App.js',
                    '<%= dirs.mixin %>Navigation.js',
                    '<%= dirs.model %>Tech.js',
                    '<%= dirs.model %>Profile.js',
                    '<%= dirs.model %>Page.js',
                    '<%= dirs.model %>Project.js',
                    '<%= dirs.model %>Network.js',
                    '<%= dirs.model %>Book.js',
                    '<%= dirs.view %>AnimationView.js',
                    '<%= dirs.view %>About.js',
                    '<%= dirs.view %>Blog.js',
                    '<%= dirs.view %>Book.js',
                    '<%= dirs.view %>BookList.js',
                    '<%= dirs.view %>CMS.js',
                    '<%= dirs.view %>Footer.js',
                    '<%= dirs.view %>Header.js',
                    '<%= dirs.view %>Index.js',
                    '<%= dirs.view %>ResourceManager.js',
                    '<%= dirs.view %>Row.js',
                    '<%= dirs.view %>Network.js',
                    '<%= dirs.view %>NetworkList.js',
                    '<%= dirs.view %>Profile.js',
                    '<%= dirs.view %>Tile.js',
                    '<%= dirs.view %>TileEmpty.js',
                    '<%= dirs.view %>Project.js',
                    '<%= dirs.view %>Projects.js',
                    '<%= dirs.view %>Register.js',
                    '<%= dirs.view %>Tech.js',
                    '<%= dirs.view %>TechList.js',
                    '<%= dirs.controller %>About.js',
                    '<%= dirs.controller %>CMS.js',
                    '<%= dirs.controller %>Index.js',
                    '<%= dirs.controller %>Register.js',
                    '<%= dirs.controller %>Projects.js',
                    '<%= dirs.controller %>Project.js',
                    '<%= dirs.collection %>Book.js',
                    '<%= dirs.collection %>Network.js',
                    '<%= dirs.collection %>Project.js',
                    '<%= dirs.collection %>Tech.js',
                    '<%= dirs.app %>App.Tmpl.js',
                    '<%= dirs.app %>App.Data.js',
                    '<%= dirs.app %>App.Routing.js'
                ],
                dest: '<%= dirs.dist %>app.concat.js'
            },
            css: {
                src: [
                    '<%= dirs.base %>reset.css',
                    '<%= dirs.base %>common.css',
                    '<%= dirs.base %>typography.css',
                    '<%= dirs.base %>buttons.css',
                    '<%= dirs.base %>sprites.css',
                    '<%= dirs.css %>libs/isotope.css',
                    '<%= dirs.layout %>header.css',
                    '<%= dirs.layout %>footer.css',
                    '<%= dirs.layout %>canvas.css',
                    '<%= dirs.layout %>modal.css',
                    '<%= dirs.modules %>tile.css',
                    '<%= dirs.modules %>form.css',
                    '<%= dirs.modules %>form-login.css',
                    '<%= dirs.modules %>info.css',
                    '<%= dirs.modules %>tileList.css',
                    '<%= dirs.modules %>techList.css',
                    '<%= dirs.modules %>tipList.css',
                    '<%= dirs.modules %>networkList.css',
                    '<%= dirs.modules %>bookList.css',
                    '<%= dirs.modules %>project.css',
                    '<%= dirs.modules %>projects.css',
                    '<%= dirs.modules %>about.css',
                    '<%= dirs.modules %>cms.css',
                    '<%= dirs.modules %>resourceManager.css',
                    '<%= dirs.modules %>profile.css',
                    '<%= dirs.modules %>welcome.css',
                    '<%= dirs.modules %>fourohfour.css',
                    '<%= dirs.layout %>tileSize.css'
                ],
                dest: '<%= dirs.dist %>app.concat.css'
            }
        },
        uglify: {
            files: {
                src: ['<%= concat.js.dest %>'],
                dest: '<%= dirs.dist %>app.min.js'
            }
        },
        cssmin: {
            files: {
                src: ['<%= concat.css.dest %>'],
                dest: '<%= dirs.dist %>app.min.css'
            }
        },
        compass: {
            dist: {
                options: {
                    config: STATIC + 'config.rb',
                    basePath: STATIC
                }
            }
        },
        undertmpl: {
            files: {
                src: '<%= dirs.templates %>*.html',
                dest: '<%= dirs.app %>App.Tmpl.js'
            }
        },
        watch: {
            scripts: {
                files: ['<%= concat.js.src %>'],
                tasks: 'js'
            },
            styles: {
                files: ['<%= concat.css.src %>'],
                tasks: 'css'
            },
            sass: {
                files: STATIC + 'scss/**/*.scss',
                tasks: 'sass'
            },
            templates: {
                files: '<%= dirs.templates %>*.html',
                tasks: 'undertmpl'
            }
        }

    });


    // Load plugin
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-undertmpl');
    grunt.loadNpmTasks('grunt-welcome');

    // Tasks
    grunt.registerTask('dev', ['js', 'css']);
    grunt.registerTask('js', ['concat:js', 'uglify']);
    grunt.registerTask('css', ['concat:css', 'cssmin']);
    grunt.registerTask('sass', ['compass', 'css']);

};
