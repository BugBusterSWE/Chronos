/**
 * Download remote repository and move it inside the directory _PATH
 */
/// <reference path="config.ts" />
/// <reference path="../Command/CommandI" />
/// <reference path="../Command/CommandSync" />
var Module;
(function (Module) {
    /**
     * @param url {string} - URL GitHub repo
     * @returns {number} - Exit statur return by git clone
     */
    function downloadPlugin(url) {
        console.log("Repo " + url);
        console.log("Read file configuration: ");
        //Read configuration file
        console.log(("- PATH : " + Module._PATH + " \n") +
            ("- EXPR_GIT : " + Module._EXPR_GIT));
        //Catch first gruop matched that it is the name of plugin
        var namePlugin = Module._EXPR_GIT.exec(url)[1];
        console.log("Plugin : " + namePlugin);
        var code = Module.Code._SUCCESS;
        if (namePlugin.length === 0) {
            code = Module.Code._GENERAL_ERROR;
        }
        else {
            //Download repo git in the plugins directory.
            //If _PATH directory not exist git will create it when clone
            //remote repo.
            var cmd = new Command.CommandSync('git', //Subversion program used
            ['clone', url, Module._PATH + namePlugin]);
            code = cmd.exec(); //wait termination of task
        }
        return code;
    }
    Module.downloadPlugin = downloadPlugin;
    ;
})(Module || (Module = {}));
//# sourceMappingURL=dl_plugin.js.map