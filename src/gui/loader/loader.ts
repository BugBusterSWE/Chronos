/**
 * Created by matteo on 24/02/16.
 */

declare var require : any;
declare var __GIT_PATH : any;
declare var __plugin : any;

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
        var pluginNode : HTMLElement = document.getElementById( 'plugin' );

        if ( !err ) {
            // Set current plugin loaded to use the short expression module
            __plugin = `${__GIT_PATH}${author}/${plugin}.git`;

            // Set content of index.html in div 'plugin'
            pluginNode.innerHTML = data;

            var scriptsDeclared : NodeListOf<HTMLScriptElement> =
                pluginNode.getElementsByTagName( "script" );

            // For each script included in file index, will create a its copy
            // and append it in the head of rendering page to reload the script
            // required.
            while ( scriptsDeclared.length > 0 ) {
                // Create a copy of script
                var script : HTMLScriptElement =
                    document.createElement( "script" );

                // Get the absolutely path declared in src script attribute
                var absolutelyPath = scriptsDeclared[0].src;
                // Get all path forward gui
                var relativePath = /gui\/(.*)/.exec( absolutelyPath )[1];

                // Path plugin loaded respect at src/gui of Chronos
                script.src =
                    `../../plugins/${author}/${plugin}/${relativePath}`;
                script.type = scriptsDeclared[0].type;

                // Remove script included for not to have two copy of the same
                // script.
                scriptsDeclared[0].parentNode.removeChild(
                    scriptsDeclared[0]
                );

                // Load script
                document.head.appendChild( script );
            }
        } else {
            pluginNode.innerHTML = err;
        }
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
