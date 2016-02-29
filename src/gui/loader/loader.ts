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
 * List all the authors and, for each author, the plugins.
 */
function listPlugins() {
    var fs = require('fs');
    var root : string = './plugins/';
    var files: string[] = fs.readdirSync(root);
    var authors : Author[] = [];
    for(var i = 0; i < files.length; i++) {
        var author: Author = new Author(files[i]);
        var plugins: string[] = fs.readdirSync(root + files[i]);
        for (var j = 0; j < plugins.length; j++) {
            var file = plugins[j];
            var filePath = root + author.getName() + '/' + file;
            var stat: any = fs.statSync(filePath);
            if (stat.isDirectory()) {
                author.addPlugin(file);
            }
        }
        if (plugins.length != 0) {
            authors.push(author);
        }
    }
    console.log(createHTMLList(authors));
}

/**
 * Creates a definition list (<dl>) in function of the passed array. The <dt> tags are author names, the <dd> tags are
 * the plugins of that actor.
 * @param authors An array which contains the authors of the installed plugins.
 * @returns {string} A definition list with the specified properties (see above).
 */
function createHTMLList(authors: Author[]): string {
    var dl: string = '<dl>';
    for (var i: number = 0; i < authors.length; i++) {
        dl += '<dt>' + authors[i].getName() + '</dt>';
        var plugins: string[] = authors[i].getPlugins();
        for (var j: number = 0; j < plugins.length; j++) {
            dl += '<dd onclick="initGUI(\'' + authors[i].getName() + '\',\'' + plugins[j] + '\');">' +
                plugins[j] + '</dd>';
        }
    }
    dl += '</dl>';
    document.getElementById('plugin').innerHTML = dl;
    return dl;
}