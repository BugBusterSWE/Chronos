/**
 * @author @korut94 on 09/02/16.
 */

/// <reference path="CommandAbs.ts" />
module Command{
    /**
     * @classdesc CommandSync perform a synchronous child process
     */
    export class CommandSync extends CommandAbs {
        //Executor of process
        private static SPAWN = require('child_process').spawnSync;

        constructor( cmd : string, opt : Array<string> = [] ) {
            super( cmd, opt );
        }

        /**
         * Run command in a synchronous way
         * @override
         */
        public exec() : number {
            //Rappresentazione del processo figlio
            return CommandSync.SPAWN( this.cmd, this.opt ).status;
        }
    }
}
