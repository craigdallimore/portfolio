module.exports = function(grunt) {

    var STATIC = 'static/';

    // Project config
    grunt.initConfig({
        dirs: {

        },
        concat: {
            js: {
                src: [
                    STATIC + 'js/libs/backbone.collection.iterator.js',
                    STATIC + 'js/libs/jquery.isotope.min.js',
                    STATIC + 'js/mixin.js',
                    STATIC + 'js/App/App.js',

                    STATIC + 'js/App/Model/Tech.js',
                    STATIC + 'js/App/Model/Profile.js',
                    STATIC + 'js/App/Model/Page.js',
                    STATIC + 'js/App/Model/Project.js',
                    STATIC + 'js/App/Model/Network.js',
                    STATIC + 'js/App/Model/Book.js',

                    STATIC + 'js/App/View/AnimationView.js',
                    STATIC + 'js/App/View/Index.js',
                    STATIC + 'js/App/View/Header.js',
                    STATIC + 'js/App/View/Footer.js',
                    STATIC + 'js/App/View/About.js',
                    STATIC + 'js/App/View/Blog.js',
                    STATIC + 'js/App/View/Project.js',
                    STATIC + 'js/App/View/Profile.js',

                    STATIC + 'js/App/View/Tech.js',
                    STATIC + 'js/App/View/TechList.js',

                    STATIC + 'js/App/View/Tile.js',
                    STATIC + 'js/App/View/TileEmpty.js',
                    STATIC + 'js/App/View/Projects.js',
                    STATIC + 'js/App/View/Network.js',
                    STATIC + 'js/App/View/NetworkList.js',
                    STATIC + 'js/App/View/Book.js',
                    STATIC + 'js/App/View/BookList.js',

                    STATIC + 'js/App/Controller/Route.js',
                    STATIC + 'js/App/Collection/Project.js',
                    STATIC + 'js/App/Collection/Network.js',
                    STATIC + 'js/App/Collection/Book.js',
                    STATIC + 'js/App/Collection/Tech.js',

                    STATIC + 'js/App/App.Tmpl.js',
                    STATIC + 'js/App/App.Data.js',
                    STATIC + 'js/App/App.Routing.js'
                ],
                dest: STATIC + 'dist/app.concat.js'
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
                    STATIC + 'css/modules/info.css',
                    STATIC + 'css/modules/tileList.css',
                    STATIC + 'css/modules/techList.css',
                    STATIC + 'css/modules/tipList.css',
                    STATIC + 'css/modules/networkList.css',
                    STATIC + 'css/modules/bookList.css',
                    STATIC + 'css/modules/project.css',
                    STATIC + 'css/modules/about.css',
                    STATIC + 'css/modules/profile.css',
                    STATIC + 'css/modules/welcome.css',
                    STATIC + 'css/modules/fourohfour.css',
                    STATIC + 'css/layout/tileSize.css'
                ],
                dest: STATIC + 'dist/app.concat.css'
            }
        },
        uglify: {
            files: {
                src: ['<%= concat.js.dest %>'],
                dest: STATIC + 'dist/app.min.js'
            }
        },
        cssmin: {
            files: {
                src: ['<%= concat.css.dest %>'],
                dest: STATIC + 'dist/app.min.css'
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
    grunt.registerTask('dev', ['js', 'css', 'welcome']);
    grunt.registerTask('js', ['concat:js', 'uglify']);
    grunt.registerTask('css', ['concat:css', 'cssmin']);
    grunt.registerTask('sass', ['compass', 'css']);

/*
Need templates
Need mocha?
Needs welcome!

    grunt.registerTask('tmpl', 'undertmpl js');
        undertmpl: {
            tmpl: {
                src: [
                    WEB_APP_STATIC + 'templates/*.html'
                ],
                dest: WEB_APP_STATIC + 'js/App/App.Tmpl.js'
            }
        },
        mocha: {
            tests: {
                src: ['tests/tests.html'],
                options: {
                    run: true
                }
            }
        }
* */
};
