/*global module:false*/
module.exports = function(grunt) {

    var _ = require('underscore');

    var proc = require('child_process'),
        WEB_APP_STATIC = 'static/';

    // Project configuration.
    grunt.initConfig({

        watch: {
            scripts: {
                files: '<config:concat.dist.src>',
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
                tasks: 'templates js'
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
            'static/dist/app.min.css': [
                WEB_APP_STATIC + 'css/base/reset.css',
                WEB_APP_STATIC + 'css/base/common.css',
                WEB_APP_STATIC + 'css/base/typography.css',
                WEB_APP_STATIC + 'css/base/buttons.css',
                WEB_APP_STATIC + 'css/base/sprites.css',
                WEB_APP_STATIC + 'css/libs/isotope.css',
                WEB_APP_STATIC + 'css/layout/header.css',
                WEB_APP_STATIC + 'css/layout/canvas.css',
                WEB_APP_STATIC + 'css/modules/tileList.css',
                WEB_APP_STATIC + 'css/modules/projectDetails.css',
                WEB_APP_STATIC + 'css/layout/tileSize.css'
            ]
        },

        // JavaScript Concatenation
        concat: {
            dist: {
                src: [
                    WEB_APP_STATIC + 'js/libs/jquery.isotope.min.js',
                    WEB_APP_STATIC + 'js/mixin.js',
                    WEB_APP_STATIC + 'js/App/App.js',
                    WEB_APP_STATIC + 'js/App/Model/Page.js',
                    WEB_APP_STATIC + 'js/App/Model/Project.js',
                    WEB_APP_STATIC + 'js/App/View/Index.js',
                    WEB_APP_STATIC + 'js/App/View/About.js',
                    WEB_APP_STATIC + 'js/App/View/Blog.js',
                    WEB_APP_STATIC + 'js/App/View/Page.js',
                    WEB_APP_STATIC + 'js/App/View/Tile.js',
                    WEB_APP_STATIC + 'js/App/View/TileList.js',
                    WEB_APP_STATIC + 'js/App/View/Project.js',
                    WEB_APP_STATIC + 'js/App/Controller/Route.js',
                    WEB_APP_STATIC + 'js/App/Collection/Project.js',
                    WEB_APP_STATIC + 'js/App/App.Tmpl.js',
                    WEB_APP_STATIC + 'js/App/App.Routing.js'
                ],
                dest: WEB_APP_STATIC + 'dist/app.concat.js'
            }
        },

        // JavaScript minification
        min: {
            dist: {
                src: ['<config:concat.dist.dest>'],
                dest: WEB_APP_STATIC + 'dist/app.min.js'
            }
        }
    });


    // Plugins
    grunt.loadNpmTasks('grunt-contrib'); //Load contrib tasks for css concat

    // Tasks
    grunt.registerTask('dev', 'templates css js');
    grunt.registerTask('css', 'mincss');
    grunt.registerTask('js', 'concat min');

    grunt.registerTask("sass", "SASS -> CSS", function() {
        proc.exec("compass compile ./static");
    });

    grunt.registerMultiTask('templates', 'Compile underscore templates to JS', function () {
        var files = grunt.file.expandFiles(this.file.src),
            dest = this.file.dest || '.';
        var src = grunt.helper('templates', files);
        grunt.file.write(dest, src);
        console.log("underscore templates rendered as JavaScript");
    });

    grunt.registerHelper('templates', function (files) {
        //var prefix = 'App.Tmpl';
        var prefix = 'Tmpl';
        var moduleStart = 'App.module("Tmpl", function(Tmpl, App) {\n';
        //var output = prefix + ' = {};\n';
        var output = moduleStart;
        files.map(function (filepath) {
            output += '    ' + prefix + '.' +
            filepath.replace('static/templates/', '').replace('.html', '') + '=' +
            _.template(grunt.task.directive(filepath, grunt.file.read)).source.replace(/(\n|\t|\\n|\\t)/gi, '').replace(/\s+/gi, ' ') + ';\n';
        });

        output += '});';

        return output;
    });



};
