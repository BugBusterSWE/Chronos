/**
 * Created by amantova on 09/02/16.
 */

/// <reference path="CommandI.ts" />
module Command{
    /**
     * @classdesc CommandAbs - Informazioni comuni ad ogni tipo di Command
     */
    export abstract class CommandAbs implements CommandI{
        //Comando da eseguire
        protected cmd : string;
        //Opzioni passate
        protected opt : Array<string>;

        /**
         * Costruisce un oggetto di tipo CommandAbs
         *
         * @param cmd - Stringa del comando da eseguire
         * @param opt - Array delle opzioni richieste
         */
        public constructor( cmd : string, opt : Array<string> ) {
            this.cmd = cmd;
            this.opt = opt;
        }

        public abstract exec() : number;
    }
}
