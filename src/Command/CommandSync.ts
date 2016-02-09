/**
 * @author @korut94 on 09/02/16.
 */

/// <reference path="CommandAbs.ts" />
module Command{
    /**
     * @classdesc CommandSync implementa un comando eseguito in modo sincrono
     */
    export class CommandSync extends CommandAbs {
        //Esecutore del processo
        private static SPAWN = require('child_process').spawnSync;

        constructor( cmd : string, opt : Array<string> = [] ) {
            super( cmd, opt );
        }

        /**
         * Esegui la comando passato in modo sincrono
         * @override
         */
        public exec() : number {
            //Rappresentazione del processo figlio
            return CommandSync.SPAWN( this.cmd, this.opt ).status;
        }
    }
}
