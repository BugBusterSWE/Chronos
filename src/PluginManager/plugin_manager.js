/**
 * Module which exports four function for download, update, remove and run a plugin in an asynchronous way.
 * Created by matteo on 22/02/16.
 */
/// <reference path="../Module/dl_plugin.ts" />
/// <reference path="../Module/rm_plugin.ts" />
/// <reference path="../Module/up_plugin.ts" />
/// <reference path="../Module/run_plugin.ts" />

/**
 * Function which call a function in an asynchronous way.
 * @param toCall The function which will be called.
 * @param args An array which contains the arguments for the function.
 */
function asyncCall(toCall, args) {
    var async = require('async');
    async.series([
        function (callback) {
            if (args) {
                switch (args.length) {
                    case 1:
                        callback(toCall(args[0]));
                        break;
                    case 2:
                        callback(toCall(args[0], args[1]));
                        break;
                    case 3:
                        callback(toCall(args[0], args[1], args[2]));
                        break;
                }
            } else {
                callback('Can\'t perform the operation: not enough arguments.');
            }
        }
        ],
        function (ris) {
            return ris;
        }
    );
}

var arguments = new Array();

/**
 * Downloads a plugin.
 * @param plugin The url of the plugin.
 */
exports.download = function (plugin) {
    arguments.push(plugin);
    return asyncCall(Module.downloadPlugin, arguments);
}

/**
 * Updates a plugin.
 * @param plugin The url of the plugin.
 */
exports.update = function (plugin) {
    arguments.push(plugin);
    return asyncCall(Module.updatePlugin, arguments);
}

/**
 * Removes a plugin
 * @param plugin The url of the plugin.
 */
exports.remove = function (plugin) {
    arguments.push(plugin);
    return asyncCall(Module.removePlugin, arguments);
}

/**
 * Runs a plugin
 * @param plugin The url of the plugin.
 * @param module The module in the plugin which will be executed.
 * @param args An array which contains the arguments for the execution of the plugin.
 */
exports.run = function (plugin, module, args) {
    arguments.push(plugin); arguments.push(module); arguments.push(args);
    return asyncCall(Module.runModule, arguments);
}