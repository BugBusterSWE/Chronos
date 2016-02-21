/**
 * Remove plugin from the system.
 *
 * Created by @korut94 on 10/02/16.
 */
/// <require path="config.ts" />
/// <require path="../Command/CommandSync.ts" />
var Module;
(function (Module) {
    var fs = require('fs');
    /**
     * @param url {string} - URL plugin's repo to erase
     * @returns {number} - Exit code after erase
     */
    function removePlugin(url) {
        console.log("URL : " + url);
        //Catch first gruop matched that it is the name of plugin
        var namePlugin = Module._EXPR_GIT.exec(url)[1];
        console.log("Status directory " + (Module._PATH + namePlugin) + ": ");
        var code = Module.Code._SUCCESS;
        //Check and remove directory if present
        try {
            fs.accessSync(Module._PATH + namePlugin);
            console.log("Plugin exist");
            new Command.CommandSync("rm", ["-rf", Module._PATH + namePlugin]).exec();
            console.log("Plugin remove");
        }
        catch (err) {
            console.log(err.message);
            code = Module.Code._INVALID_ARG;
        }
        return code;
    }
    Module.removePlugin = removePlugin;
})(Module || (Module = {}));
//# sourceMappingURL=rm_plugin.js.map