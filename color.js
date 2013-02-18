// Example usage:
// node color.js source/path/ dest/path/ ff0000

(function() {


    if (!process.argv[2]) {
        console.log('No source path supplied');
        return;
    }

    if (!process.argv[3]) {
        console.log('No destination path supplied');
        return;
    }


    if (!process.argv[4]) {
        console.log('No hex value supplied');
        return;
    }

    var

    gm = require('gm'),
    fs = require('fs'),
    i = require('underscore'),

    source = process.argv[2],
    dest = process.argv[3],
    hex = process.argv[4],

    hexToRgb = function(hex) {

        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        if (hex.length === 3) {
            var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            hex = hex.replace(shorthandRegex, function(m, r, g, b) {
                return r + r + g + g + b + b;
            });
        }

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16) / 2.55,
            g: parseInt(result[2], 16) / 2.55,
            b: parseInt(result[3], 16) / 2.55
        } : null;
    },

    composite = hexToRgb(hex),

    colorize = function(fileName) {

        var sourcePath = source + fileName,
            destPath = dest + fileName,
            r = composite.r,
            g = composite.g,
            b = composite.b;

        console.log(r,g,b);

        gm(sourcePath)
            .colorize(r, g, b)
            .negative()
            .write(destPath, function(err) {
                if(err) console.log('AW HELL'); return;
            });

    };

    fs.readdir(source, function(err, files) {

        files.forEach(colorize);

    });

}());
