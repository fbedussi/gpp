var pp = require('preprocess');
var path = require('path');
var fs = require('fs-extra');
var chokidar = require('chokidar');
var context = {
    env: 'dev'
};
var options = {
    type: 'sh'
};

var sourceDir = 'features_src';
var destDir = 'features';
var excludeDir = 'Partials';
var watch = false;

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
        case 'env':
            context.env = param[1];
            break;
        case 'varfile':
            context = require(path.resolve(param[1]))
            break;
        case 'w':
            watch = true;
            break;
    }
});

function build() {
    var processQueue = [];

    fs.emptyDir(destDir, function () {
        fs.walk(sourceDir)
            .on('data', function (item) {
                var file = item.path;
                if (item.stats.isDirectory() || path.dirname(file).match(excludeDir)) {
                    return;
                }

                var destFolder = path.dirname(file).replace(sourceDir, destDir);

                fs.mkdirs(destFolder, function (e) {
                    processQueue.push(new Promise((fullfill, reject) => {
                        pp.preprocessFile(file, file.replace(sourceDir, destDir), context, (err, result) => {err ? reject(err) : fullfill()}, options);
                    }));
                });
            })
        ;

        Promise.all(processQueue)
            .then(() => console.log('Build ended successfully at:', Date("2015-03-25T12:00:00")))
            .catch(err => console.log('Build ERROR: ', err))
        ;
    });
}

build();

if (watch) {
    console.log('I\'m watching: ', sourceDir);
    chokidar.watch(sourceDir, { ignored: excludeDir }).on('change', () => {
        console.log('\nRebuilding again at:', Date("2015-03-25T12:00:00"));
        build();
    });
}
