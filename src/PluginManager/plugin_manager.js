/**
 * Executes a module (indicated by an option) in an asynchronous way (using async.series). After the execution a
 * callback function is called. This function print, using console.log(), the result of the module execution.
 *
 * Legal options are:
 *      -) -d (or --download) for downloading the plugin. You must specify the url of the plugin.
 *      -) -u (or --update) for updating the plugin. You must specify the url of the plugin.
 *      -) -r (or --remove) for removing the plugin. You must specify the url of the plugin.
 *      -) -n (or --run) for executing the plugin. You must specify the url of the plugin.
 * Each plugin can provide a lot of modules: since each module is stored in a directory named as the module
 * itself you must also specify this name. Please, use the -m (or --module) option for this.
 * And, you know, each module can (and generally) have a lot of parameters. You have to specify these parameters if the
 * module requires it. You must provide only the values of these parameters, and you must do it in this way:
 *      -) -p (or --parameters) "list of comma separated values"
 * Please take note that -m and -p options are illegal used with -d, -u and -r, and you will get an error if you use
 * these combinations.
 *
 * Created by matteo on 20/02/16.
 */
/// <reference path="../Module/dl_plugin.ts" />
/// <reference path="../Module/rm_plugin.ts" />
/// <reference path="../Module/up_plugin.ts" />
/// <reference path="../Module/run_plugin.ts" />
var options = {
    d: 'd',
    u: 'u',
    n: 'n',
    r: 'r'
};
var async = require("async");
var getopt = require('posix-getopt');
var parser, option;
var command, module, plugin;
var args;
var error = false;
parser = new getopt.BasicParser('d:(download)r:(remove)n:(run)u:(upload)m:(module)p:(parameters)', process.argv);
while ((option = parser.getopt()) !== undefined) {
    switch (option.option) {
        case options.d:
            command = options.d;
            plugin = option.optarg;
            break;
        case options.r:
            command = options.r;
            plugin = option.optarg;
            break;
        case options.n:
            command = options.n;
            plugin = option.optarg;
            if (error) {
                error = false;
            }
            break;
        case options.u:
            command = options.u;
            plugin = option.optarg;
            break;
        case 'm':
            if (command != options.n) {
                error = true;
            }
            else {
                module = option.optarg;
            }
            break;
        case 'p':
            if (command != options.n) {
                error = true;
            }
            else {
                args = option.optarg.toString().split(',');
            }
    }
}
// Call in asynchronous way the module.
if (!error) {
    async.series([
        function (callback) {
            switch (command) {
                case options.d:
                    callback(Module.downloadPlugin(plugin));
                    break;
                case options.r:
                    callback(Module.removePlugin(plugin));
                    break;
                case options.u:
                    callback(Module.updatePlugin(plugin));
                    break;
                case options.n:
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
else {
    console.error('You must use -m and/or -p option only with -n (--run)!');
}
//# sourceMappingURL=plugin_manager.js.map