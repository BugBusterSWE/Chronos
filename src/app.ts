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
/// <reference path="../typings/main.d.ts" />

var getopt = require('posix-getopt');
var async = require('async');

var parser : any, option : any;
var selectedOption : string;
var command : string, args : string[], plugin : string, userModule : string;
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
                userModule = option.optarg;
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

if (selectedOption == 'g') {
    const spawn = require('child_process').spawn;
    const gui = spawn('electron', ['src/gui']);

    // Comunication map:
    // PMP <-- stdout -- GUI
    // The gui send data through stdout channel and the pmp receive it
    //
    // PMP -- stdin --> GUI
    // Instead, pmp send data through stdin channel and the gui receive it

    gui.stdout.on('data', (data) => {
        console.log(`Parent received ${data}`);

        var pack:Package.PackRe = JSON.parse(data.toString());

        //Try to perform the required operation in an asynchronous way
        async.series([
                function (callback) {
                    // pack.action contains the required operation
                    // switch in function of it to discover what the user want
                    var ris: any;
                    var code: number;
                    switch (pack.action) {
                        case 'download':
                            code = Module.downloadPlugin(pack.plugin);
                            break;
                        case 'update':
                            code = Module.updatePlugin(pack.plugin);
                            break;
                        case 'remove':
                            code = Module.removePlugin(pack.plugin);
                            break;
                        case 'run':
                            [ris, code] = Module.runModule(pack.plugin, pack.module, pack.args);
                            break;
                    }
                    if (pack.action != 'run') {
                        if (code == 0) {
                            callback(pack.action + 'success!');
                        }
                        else {
                            callback('Ops, an error has occurred, please check the console for more information.' +
                                'Error code: ' + code);
                        }
                    }
                    else {
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
                        callback(Module.runModule(plugin, userModule));
                    }
                    else {
                        callback(Module.runModule(plugin, userModule, args));
                    }
                    break;
            }
        }
    ], function (ris) {
        console.log(ris);
    });
}
