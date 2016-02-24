/**
 * Start script to execute Chronos
 *
 * Created by matteo on 22/02/16.
 */

/// <reference path="module/dl_plugin.ts" />
/// <reference path="module/rm_plugin.ts" />
/// <reference path="module/up_plugin.ts" />
/// <reference path="module/run_plugin.ts" />
/// <reference path="pack/pack.ts" />

declare var require : any;

var getopt = require('posix-getopt');
var parser : any, option : any;
var selectedOption : string;
var command : string, args : string[], plugin : string, module : string;
var error : boolean = false;
parser = new getopt.BasicParser('g(gui)t(terminal)d:(download)r:(remove)n:(run)u:(upload)m:(module)p:(parameters)',
    process.argv);
while ((option = parser.getopt()) !== undefined) {
    switch (option.option) {
        case 'g':
            selectedOption = 'g';
            break;
        case 't':
            selectedOption = 't';
            break;
        case 'd':
            command = 'd';
            plugin = option.optarg;
            break;
        case 'r':
            command = 'r';
            plugin = option.optarg;
            break;
        case 'n':
            command = 'n';
            plugin = option.optarg;
            if (error) {
                error = false;
            }
            break;
        case 'u':
            command = 'u';
            plugin = option.optarg;
            break;
        case 'm':
            if (command != 'n') {
                error = true;
            }
            else {
                module = option.optarg;
            }
            break;
        case 'p':
            if (command != 'n') {
                error = true;
            }
            else {
                args = option.optarg.toString().split(',');
            }
    }
}

var async = require('async');

if (selectedOption == 'g') {
    const spawn = require('child_process').spawn;
    const gui = spawn('electron', ['src/gui']);

    // Mappa comunicazione:
    // PMP <-- stdout -- GUI
    // la gui invia i dati e pmp gli riceve usando la stdout.
    //
    // PMP -- stdin --> GUI
    // pmp invia i dati e la gui gli rivece usando la stdin.

    gui.stdout.on('data', (data) => {
        console.log(`Parent received ${data}`);

        var pack:Package.PackRe = JSON.parse(data.toString());

        //Try to perform the required operation in an asynchronous way
        async.series([
                function (callback) {
                    // pack.action contains the required operation
                    // switch in function of it to discover what the user want
                    var ris : number;
                    switch (pack.action) {
                        case 'download':
                            ris = Module.downloadPlugin(pack.plugin);
                            break;
                        case 'update':
                            ris = Module.updatePlugin(pack.plugin);
                            break;
                        case 'remove':
                            ris = Module.removePlugin(pack.plugin);
                            break;
                        case 'run':
                            ris = Module.runModule(pack.plugin, pack.module, pack.args);
                            break;
                    }
                    if (pack.action != 'run') {
                        if (ris == 0) {
                            callback('Everything OK!');
                        } else {
                            callback('Ops, an error has occurred, please check the console for more information.' +
                                'Error code: ' + ris);
                        }
                    } else {
                        callback(ris);
                    }
                }
            ],
            /*
             This callback function is called after the execution of the main function (see above). ris contains the result
             of the operation.
             */
            function (ris) {
                // create a little packet with the result of the operation...
                var lightPack:Package.PackSe = new Package.PackSe(
                    pack.channel,
                    ris
                );
                //... and send it to the gui
                gui.stdin.write(JSON.stringify(lightPack));
            }
        );
    });

    gui.stdout.on('end', () => {
        console.log("Received request to close pipe stdout");
    });

    gui.on('close', (code) => {
        console.log(`Gui process exited with code ${code}`);
    });
} else {
    async.series([
        function (callback) {
            switch (command) {
                case 'd':
                    callback(Module.downloadPlugin(plugin));
                    break;
                case 'r':
                    callback(Module.removePlugin(plugin));
                    break;
                case 'u':
                    callback(Module.updatePlugin(plugin));
                    break;
                case 'n':
                    if (args && args.length == 0) {
                        callback(Module.runModule(plugin, module));
                    }
                    else {
                        callback(Module.runModule(plugin, module, args));
                    }
                    break;
            }
        }
    ], function (ris) {
        console.log(ris);
    });
}