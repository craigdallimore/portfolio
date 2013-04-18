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
            view:       './static/js/App/View/',
            model:      './static/js/App/Model/'
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
                    '<%= dirs.view %>Network.js',
                    '<%= dirs.view %>NetworkList.js',
                    '<%= dirs.view %>Profile.js',
                    '<%= dirs.view %>Project.js',
                    '<%= dirs.view %>Projects.js',
                    '<%= dirs.view %>Register.js',
                    '<%= dirs.view %>Tech.js',
                    '<%= dirs.view %>TechList.js',
                    '<%= dirs.view %>Tile.js',
                    '<%= dirs.view %>TileEmpty.js',
                    '<%= dirs.collection %>Project.js',
                    '<%= dirs.collection %>Network.js',
                    '<%= dirs.collection %>Book.js',
                    '<%= dirs.collection %>Tech.js',
                    '<%= dirs.app %>App.Tmpl.js',
                    '<%= dirs.app %>App.Data.js',
                    '<%= dirs.app %>App.Controller.js',
                    '<%= dirs.app %>App.Routing.js'
                ],
                dest: '<%= dirs.dist  %>app.concat.js'
            },
            css: {
                src: [
                    STATIC + 'css/base/reset.css',
                    STATIC + 'css/base/common.css',
                    STATIC + 'css/base/typography.css',
                    STATIC + 'css/base/buttons.css',
                    STATIC + 'css/base/sprites.css',
                    STATIC + 'css/libs/isotope.css',
                    STATIC + 'css/layout/header.css',
                    STATIC + 'css/layout/footer.css',
                    STATIC + 'css/layout/canvas.css',
                    STATIC + 'css/layout/modal.css',
                    STATIC + 'css/modules/tile.css',
                    STATIC + 'css/modules/form.css',
                    STATIC + 'css/modules/form-login.css',
                    STATIC + 'css/modules/info.css',
                    STATIC + 'css/modules/tileList.css',
                    STATIC + 'css/modules/techList.css',
                    STATIC + 'css/modules/tipList.css',
                    STATIC + 'css/modules/networkList.css',
                    STATIC + 'css/modules/bookList.css',
                    STATIC + 'css/modules/project.css',
                    STATIC + 'css/modules/projects.css',
                    STATIC + 'css/modules/about.css',
                    STATIC + 'css/modules/cms.css',
                    STATIC + 'css/modules/profile.css',
                    STATIC + 'css/modules/welcome.css',
                    STATIC + 'css/modules/fourohfour.css',
                    STATIC + 'css/layout/tileSize.css'
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
                src: STATIC + 'templates/*.html',
                dest: STATIC + 'js/App/App.Tmpl.js'
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
                files: STATIC + 'templates/*.html',
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
