/**
 * Created by matteo on 24/02/16.
 */

declare var require : any;

/**
 * Given an html file which contains the main GUI of Chronos, this function load the specific GUI of a plugin and put
 * it into a <div id='plugin'></div>. This div must be present in the main GUI. The specific GUI must be into a file
 * named index.html in /plugins/author/plugin. This file must not contain <html>, <head>, <body> tags, but only the GUI
 * code.
 * @param author The author of the plugin.
 * @param plugin The name of the plugin itself.
 */
function initGUI(author, plugin) {
    var fs = require('fs');
    console.log(require('path').dirname(require.main.filename));
    fs.readFile('./plugins/' + author + '/' + plugin + '/index.html', function (err, data) {
        document.getElementById('plugin').innerHTML = ((err) ? err : data);
    });
}

/**
 *
 */
function listPlugins() {
    var fs = require('fs');
    var root : string = './plugins/'
    fs.readdir(root, function (err, files) {
        if (err) {
            console.error(err);
        }
        else {
            var plugins : string[] = [];
            for(var i = 0; i < files.length; i++) {
                var author = files[i];
                fs.readdir(root + files[i], function (err, files) {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        for (var i = 0; i < files.length; i++) {
                            var file = files[i];
                            var filePath = root + author + '/' + file;
                            fs.stat(filePath, function(err, stat) {
                                if (stat.isDirectory()) {
                                    plugins.push(file);
                                }
                            });
                        }
                    }
                });
            }
            //todo gestire meglio array
        }
    });
}

class Plugin {

}