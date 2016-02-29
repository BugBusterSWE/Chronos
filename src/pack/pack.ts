/**
 * Classe definisce gli attributi dei vari tipi di Pack.
 * Created by amantova on 21/02/16.
 */

module Package {
    // Pacchetto inviato dalla GUI per poter usare le funzionalita' del plugin
    // manager.
    export class PackRe {
        public action : string;
        public plugin : string;
        public module : string;
        public args : Array<any>;
        public channel : string;

        // Viene costruito con qualsiasi cosa abbia quei specifici attributi.
        // Nel caso il pack non abbia quell'attributo verra' settato ad
        // undefined.
        constructor( pack : any ) {
            this.action = pack.action;
            this.plugin = pack.plugin;
            this.module = pack.module;
            this.args = pack.args;
            this.channel = pack.channel;
        }
    }

    // Pacchetto inviatto alla GUI con la risposta alla sua richiesta.
    export class PackSe {
        public result : any;
        public channel : string;

        constructor( channel : string, result : any = undefined ) {
            this.result = result;
            this.channel = channel;
        }
    }
}


