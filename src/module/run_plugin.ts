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

module Module{
    const fs = require('fs');

    /**
     * @param url - URL plugin's repo GitHub
     * @param module - Name module to run
     * @param [args] - Options, array list of the string arguments
     * @returns {*|number[]} -
     *  Pair value of result execution modue and status code its.
     */
    export function runModule(
        url : string,
        module : string,
        args? : Array<string> ) : [any,number] {
        console.log(
            `Received \n` +
            `- URL: ${url}\n` +
            `- Modulo: ${module}`
        );
        var namePlugin : string = _EXPR_GIT.exec( url )[1];
        console.log( `Check ${_PATH + namePlugin}/${_MODULE}${module}` );

        var code : number = Code._SUCCESS;
        var result : any = undefined;

        try{
            //Access inside module directory
            fs.accessSync( `${_PATH}${namePlugin}/${_MODULE}${module}` );

            //Create path of the safe module to load
            //The path is relative at the 'app.ts' file that it is below
            //at the 'plugins' directory.
            var pathModule : string =
                `../${_PATH}${namePlugin}/${_MODULE}${module}`;

            //Include user module
            const hisModule = require( pathModule );

            console.log( "Esecuzione modulo..." );

            /**
             * Run module with the arguments passed
             *
             * @throws No declared main funciont
             * @throws Expect arguments but received nothing
             */
            result = hisModule.main( args );

        } catch ( err ) {
            console.log( err.message );
            result = err;
            code = Code._INVALID_ARG;
        }

        return [result,code];
    }
}