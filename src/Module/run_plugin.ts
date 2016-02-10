/**
 * Esegue il modulo specificato del plugin e ritorna il risultato.
 *
 * L'esecuzione del modulo avviene trammite Node.js, quindi nella directory
 * del modulo si cerca prima un file 'package.json' che specifica il nome del
 * module e quale sia il file principale da eseguire. Altrimenti si cerca in
 * ordine un 'index.js' e successivamente 'index.node'.
 *
 * La struttura di un plugin attesto è:
 * - Nome autore
 *  *-- Nome plugin
 *      *-- modules
 *          *-- Nome modulo
 *
 * altre configurazioni verranno ignorate.
 *
 * In entrambi i casi deve essere dichiarata una funzione 'main' aggiunta
 * all'oggetto 'exports'
 *
 * Es. file index.js
 * ===========================================================================
 * exports.main = function( [args] ) {
 *      **body**
 * }
 * ===========================================================================
 *
 * @todo Da eseguire eccezzioni nel caso la funzione main le lanciasse
 *
 * Created by amantova on 10/02/16.
 */

///<require path="config.ts" />

module Module{
    const fs = require('fs');

    /**
     * @param url - URL del repo su GitHub
     * @param module - Nome del modulo del plugin che si desidera eseguire
     * @param [args] - Opzionale, array di stringhe con gli argomenti
     * @returns {*|number[]} - Coppia valore ritornato dal modulo e codice
     *                         di stato dell'esecuzione
     */
    export function runModule(
        url : string,
        module : string,
        args? : Array<string> ) : [any,number] {
        console.log(
            `Ricevuti \n` +
            `- URL: ${url}\n` +
            `- Modulo: ${module}`
        );
        var namePlugin : string = _EXPR_GIT.exec( url )[1];
        console.log( `Controllo ${_PATH + namePlugin}/${_MODULE}${module}` );

        var code : number = Code._SUCCESS;
        var result : any = undefined;

        try{
            //Accesso alla cartella del plugin
            fs.accessSync( _PATH + namePlugin );
            //Accesso alla cartella del modulo
            fs.accessSync( `${_PATH}${namePlugin}/${_MODULE}${module}` );

            //Composizione path del modulo sicuro da caricare
            //La composizione è relativa al file 'app.ts' che si trova
            //un livello sotto della directory 'plugins'.
            var pathModule : string =
                `../${_PATH}${namePlugin}/${_MODULE}${module}`;

            //Incorpora il modulo esistente dell'utente
            const hisModule = require( pathModule );

            console.log( "Esecuzione modulo..." );

            /**
             * Esegue il modulo passandogli i parametri
             *
             * @throws Nel caso non vi sia la funzione 'main' dichiarata
             * @throws Nel caso args richiesto ma non passato
             */
            result = hisModule.main( args );

        } catch ( err ) {
            console.log( err.message );
            code = Code._INVALID_ARG;
        }

        return [result,code];
    }
}