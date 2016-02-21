/**
 * Run specified module and return: status code and result.
 *
 * When you execute a module through Node.js, in the same directory start
 * a research to find 'package.json' to understand what is the main file.
 * Otherwise, first search a 'index.js' and after a 'index.node'.
 *
 * If there isn't any occurs, the module exit with status _INVALID_ARG.
 *
 * Expect a plugin structure look like this:
 * - author_name
 *  *-- plugin_name
 *      *-- modules
 *          *-- module_name
 *
 * other configuration will be ignored.
 *
 * In all case, you must add, in main file, a function main to the special
 * 'exports' object.
 *
 * @example File index.js
 * ===========================================================================
 * exports.main = function( [args] ) { //First function running
 *      **body**
 * }
 * ===========================================================================
 *
 * Created by amantova on 10/02/16.
 */
///<require path="config.ts" />
var Module;
(function (Module) {
    var fs = require('fs');
    /**
     * @param url - URL plugin's repo GitHub
     * @param module - Name module to run
     * @param [args] - Options, array list of the string arguments
     * @returns {*|number[]} -
     *  Pair value of result execution modue and status code its.
     */
    function runModule(url, module, args) {
        console.log("Received \n" +
            ("- URL: " + url + "\n") +
            ("- Modulo: " + module));
        var namePlugin = Module._EXPR_GIT.exec(url)[1];
        console.log("Check " + (Module._PATH + namePlugin) + "/" + Module._MODULE + module);
        var code = Module.Code._SUCCESS;
        var result = undefined;
        try {
            //Access inside module directory
            fs.accessSync("" + Module._PATH + namePlugin + "/" + Module._MODULE + module);
            //Create path of the safe module to load
            //The path is relative at the 'app.ts' file that it is below
            //at the 'plugins' directory.
            var pathModule = "../" + Module._PATH + namePlugin + "/" + Module._MODULE + module;
            //Include user module
            var hisModule = require(pathModule);
            console.log("Esecuzione modulo...");
            /**
             * Run module with the arguments passed
             *
             * @throws No declared main funciont
             * @throws Expect arguments but received nothing
             */
            result = hisModule.main(args);
        }
        catch (err) {
            console.log(err.message);
            result = err;
            code = Module.Code._INVALID_ARG;
        }
        return [result, code];
    }
    Module.runModule = runModule;
})(Module || (Module = {}));
//# sourceMappingURL=run_plugin.js.map