/**
 * Declaration global option inside module Module.
 * It's to prefer than a configuration because the option will not negotiable
 * throughout a normal run.
 *
 * @author @korut94
 */
var Module;
(function (Module) {
    //Plugins directory
    Module._PATH = "plugins/";
    //Modules directory
    Module._MODULE = "modules/";
    //Regex to catch "name_author/plugins"
    Module._EXPR_GIT = /:(.*)\.git$/;
    //Archive code status
    var Code;
    (function (Code) {
        //Exit with success
        Code._SUCCESS = 0;
        //General error
        Code._GENERAL_ERROR = 1;
        //Invalid argument
        Code._INVALID_ARG = 128;
    })(Code = Module.Code || (Module.Code = {}));
})(Module || (Module = {}));
//# sourceMappingURL=config.js.map