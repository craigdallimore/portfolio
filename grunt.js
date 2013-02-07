/*global module:false*/
module.exports = function(grunt) {

    grunt.initConfig({

        watch: {
            js: {
                files: '<config:concat.js.src>',
                tasks: 'js'
            },
            css: {
                files: WEB_APP_STATIC + 'css/**/*.css',
                tasks: 'css'
            },
            sass: {
                files: WEB_APP_STATIC + 'scss/**/*.scss',
                tasks: 'sass'
            },
            templates: {
                files: [ WEB_APP_STATIC + 'templates/**/*.html' ],
                tasks: 'tmpl'
            },
            spec: {
                files: 'tests/js/tests.js',
                tasks: 'mocha'
            }
        },

        undertmpl: {
            tmpl: {
                src: [
                    WEB_APP_STATIC + 'templates/*.html'
                ],
                dest: WEB_APP_STATIC + 'js/App/App.Tmpl.js'
            }
        },

        // JavaScript Concatenation
        concat: {
            js: {
                src: [
                    WEB_APP_STATIC + 'js/libs/backbone.collection.iterator.js',
                    WEB_APP_STATIC + 'js/libs/jquery.isotope.min.js',
                    WEB_APP_STATIC + 'js/mixin.js',
                    WEB_APP_STATIC + 'js/App/App.js',

                    WEB_APP_STATIC + 'js/App/Model/Tech.js',
                    WEB_APP_STATIC + 'js/App/Model/Profile.js',
                    WEB_APP_STATIC + 'js/App/Model/Page.js',
                    WEB_APP_STATIC + 'js/App/Model/Project.js',
                    WEB_APP_STATIC + 'js/App/Model/Network.js',
                    WEB_APP_STATIC + 'js/App/Model/Book.js',

                    WEB_APP_STATIC + 'js/App/View/AnimationView.js',
                    WEB_APP_STATIC + 'js/App/View/Index.js',
                    WEB_APP_STATIC + 'js/App/View/Header.js',
                    WEB_APP_STATIC + 'js/App/View/Footer.js',
                    WEB_APP_STATIC + 'js/App/View/About.js',
                    WEB_APP_STATIC + 'js/App/View/Blog.js',
                    WEB_APP_STATIC + 'js/App/View/Project.js',
                    WEB_APP_STATIC + 'js/App/View/Profile.js',

                    WEB_APP_STATIC + 'js/App/View/Tech.js',
                    WEB_APP_STATIC + 'js/App/View/TechList.js',

                    WEB_APP_STATIC + 'js/App/View/Tile.js',
                    WEB_APP_STATIC + 'js/App/View/Projects.js',
                    WEB_APP_STATIC + 'js/App/View/Network.js',
                    WEB_APP_STATIC + 'js/App/View/NetworkList.js',
                    WEB_APP_STATIC + 'js/App/View/Book.js',
                    WEB_APP_STATIC + 'js/App/View/BookList.js',

                    WEB_APP_STATIC + 'js/App/Controller/Route.js',
                    WEB_APP_STATIC + 'js/App/Collection/Project.js',
                    WEB_APP_STATIC + 'js/App/Collection/Network.js',
                    WEB_APP_STATIC + 'js/App/Collection/Book.js',
                    WEB_APP_STATIC + 'js/App/Collection/Tech.js',

                    WEB_APP_STATIC + 'js/App/App.Tmpl.js',
                    WEB_APP_STATIC + 'js/App/App.Data.js',
                    WEB_APP_STATIC + 'js/App/App.Routing.js'
                ],
                dest: WEB_APP_STATIC + 'dist/app.concat.js'
            },

            // CSS concatenation
            css: {
                src: [
                    WEB_APP_STATIC + 'css/base/reset.css',
                    WEB_APP_STATIC + 'css/base/common.css',
                    WEB_APP_STATIC + 'css/base/typography.css',
                    WEB_APP_STATIC + 'css/base/buttons.css',
                    WEB_APP_STATIC + 'css/base/sprites.css',
                    WEB_APP_STATIC + 'css/libs/isotope.css',
                    WEB_APP_STATIC + 'css/layout/responsive.css',
                    WEB_APP_STATIC + 'css/layout/header.css',
                    WEB_APP_STATIC + 'css/layout/footer.css',
                    WEB_APP_STATIC + 'css/layout/canvas.css',
                    WEB_APP_STATIC + 'css/layout/modal.css',
                    WEB_APP_STATIC + 'css/modules/tile.css',
                    WEB_APP_STATIC + 'css/modules/tileList.css',
                    WEB_APP_STATIC + 'css/modules/techList.css',
                    WEB_APP_STATIC + 'css/modules/tipList.css',
                    WEB_APP_STATIC + 'css/modules/networkList.css',
                    WEB_APP_STATIC + 'css/modules/bookList.css',
                    WEB_APP_STATIC + 'css/modules/projects.css',
                    WEB_APP_STATIC + 'css/modules/project.css',
                    WEB_APP_STATIC + 'css/modules/about.css',
                    WEB_APP_STATIC + 'css/modules/welcome.css',
                    WEB_APP_STATIC + 'css/modules/fourohfour.css',
                    WEB_APP_STATIC + 'css/layout/tileSize.css'
                ],
                dest: WEB_APP_STATIC + 'dist/app.concat.css'
            }
        },

        // JavaScript minification
        min: {
            js: {
                src: ['<config:concat.js.dest>'],
                dest: WEB_APP_STATIC + 'dist/app.min.js'
            }
        },

        // CSS Concatenation + Minification
        mincss: {
            'static/dist/app.min.css': '<config:concat.css.dest>'
        },

        mocha: {
            tests: {
                src: ['tests/tests.html'],
                options: {
                    run: true
                }
            }
        }

    });


    grunt.loadNpmTasks('grunt-contrib');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-undertmpl');
    grunt.loadNpmTasks('grunt-welcome');

    grunt.registerTask('dev', 'undertmpl css js');
    grunt.registerTask('css', 'concat:css mincss');
    grunt.registerTask('js', 'concat:js min');
    grunt.registerTask('tmpl', 'undertmpl js');

    grunt.registerTask("sass", "SASS -> CSS", function() {
        proc.exec("compass compile ./static");
    });


};

