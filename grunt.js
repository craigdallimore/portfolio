/*global module:false*/
module.exports = function(grunt) {

    var _ = require('underscore'),
        fs = require('fs');
        proc = require('child_process'),
        WEB_APP_STATIC = 'static/',
        css_files = fs.readFileSync(__dirname + '/contrib/css_files.txt', 'UTF-8').split('\n');

    css_files.pop();

    css_files = css_files.map(function(line){
        return WEB_APP_STATIC + 'css/' +  line;
    });

    // Project configuration.
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
            }
        },

        templates: {
            tmpl: {
                src: [
                    WEB_APP_STATIC + 'templates/*.html'
                ],
                dest: WEB_APP_STATIC + 'js/App/App.Tmpl.js'
            }
        },

        // CSS Concatenation + Minification
        mincss: {
            'static/dist/app.min.css': css_files
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
            css: {
                src: css_files,
                dest: WEB_APP_STATIC + 'dist/app.concat.css'
            }
        },

        // JavaScript minification
        min: {
            js: {
                src: ['<config:concat.js.dest>'],
                dest: WEB_APP_STATIC + 'dist/app.min.js'
            }
        }

    });


    // Plugins
    grunt.loadNpmTasks('grunt-contrib');

    // Tasks
    grunt.registerTask('dev', 'templates css js');
    grunt.registerTask('css', 'concat:css mincss');
    grunt.registerTask('js', 'concat:js min');
    grunt.registerTask('tmpl', 'templates js');

    grunt.registerTask("sass", "SASS -> CSS", function() {
        proc.exec("compass compile ./static");
    });

    grunt.registerTask('welcome', function() {
        var text =
'                _/                                           \n' +
'               _/                                            \n' +
'          _/_/_/    _/_/      _/_/_/    _/_/    _/    _/     \n' +
'       _/    _/  _/_/_/_/  _/        _/    _/  _/    _/      \n' +
'      _/    _/  _/        _/        _/    _/  _/    _/       \n' +
'       _/_/_/    _/_/_/    _/_/_/    _/_/      _/_/_/        \n' +
'                                                  _/         \n' +
'                                               _/_/';
        console.log(text);
    });

    grunt.registerMultiTask('templates', 'Compile underscore templates to JS', function() {
        var files = grunt.file.expandFiles(this.file.src),
            dest = this.file.dest || '.';
        var src = grunt.helper('templates', files);
        grunt.file.write(dest, src);
        console.log("underscore templates rendered as JavaScript");
    });

    grunt.registerHelper('templates', function(files) {
        var output = 'App.module("Tmpl", function(Tmpl, App) {\n';

        files.map( function(filepath) {
            output += '    Tmpl.' +
            filepath.replace('static/templates/', '').replace('.html', '') + '=' + _.template(grunt.task.directive(filepath, grunt.file.read)).source.replace(/(\n|\t|\\n|\\t)/gi, '').replace(/\s+/gi, ' ') + ';\n';
        });

        output += '});';

        return output;
    });



};

