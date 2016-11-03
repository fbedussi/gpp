var pp = require('preprocess');
var path = require('path');
var fs = require('fs-extra');
var context = {};
var options = {
    type: 'sh'
};

var sourceDir = 'features_src';
var destDir = 'features';
var excludeDir = 'Partials';

process.argv.slice(2).forEach(function (arg) {
    var param = arg.split('=');
    switch (param[0].toLowerCase()) {
        case 'source':
            sourceDir = param[1];
            break;
        case 'dest':
            destDir = param[1];
            break;
        case 'exclude':
            excludeDir = param[1];
            break;
        case 'excludeRegExp':
            excludeDir = new RegExp(param[1]);
            break;
    }
});

fs.walk(sourceDir)
    .on('data', function (item) {
        var file = item.path;
        //console.log(file);
        if (item.stats.isDirectory() || path.dirname(file).match(excludeDir)) {
            return;
        }

        var destFolder = path.dirname(file).replace(sourceDir, destDir);

        fs.stat(destFolder, function(err, stats) {
            if (err) {
                fs.mkdirs(destFolder, function(e) {
                    console.log('Non existing folder. E: ',e, ' Src: ', file, ' Dest: ', file.replace(sourceDir, destDir))
                    pp.preprocessFileSync(file, file.replace(sourceDir, destDir), context, options);
                });
            } else {
                pp.preprocessFileSync(file, file.replace(sourceDir, destDir), context, options);
            }
        });
    })
    .on('end', function () {
        console.log('Build ended')
    })
;
