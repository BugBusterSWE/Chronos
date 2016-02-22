/**
 * Created by amantova on 09/02/16.
 */

/// <reference path="CommandI.ts" />
module Command{
    /**
     * @classdesc CommandAbs - Common information about every Command types
     */
    export abstract class CommandAbs implements CommandI{
        //Command to run
        protected cmd : string;
        //Command's arguments
        protected opt : Array<string>;

        /**
         * Build a CommandAbs object
         *
         * @param cmd {string} - String command to run
         * @param opt {string[]} - Array List of string arguments
         */
        public constructor( cmd : string, opt : Array<string> ) {
            this.cmd = cmd;
            this.opt = opt;
        }

        public abstract exec() : number;
    }
}
