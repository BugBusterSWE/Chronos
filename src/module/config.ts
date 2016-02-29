/**
 * Declaration global option inside module Module.
 * It's to prefer than a configuration because the option will not negotiable
 * throughout a normal run.
 *
 * @author @korut94
 */

module Module {
    //Plugins directory
    export const _PATH : string = "plugins/";
    //Modules directory
    export const _MODULE : string = "modules/";
    // Regex to catch "name_author/plugins".
    // This expression is valid both https and ssh address
    export const _EXPR_GIT : RegExp = /.com[:|\/](.*)\.git$/;
    //Archive code status
    export module Code{
        //Exit with success
        export const _SUCCESS : number = 0;
        //General error
        export const _GENERAL_ERROR : number = 1;
        //Invalid argument
        export const _INVALID_ARG : number = 128;
    }
}