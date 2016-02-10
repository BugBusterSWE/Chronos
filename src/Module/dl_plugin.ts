/**
 * Esegui il download del repo passato come parametro nella cartella
 * specificata nella variabile globale _PATH.
 *
 * @todo Da implementare l'uso di un'altro sistema di versionamento
 */

/// <reference path="config.ts" />
/// <reference path="../Command/CommandI" />
/// <reference path="../Command/CommandSync" />

module Module{
    /**
     * @param url - URL del repo su GitHub
     * @returns {number} - Codice di stato restituito da git clone
     */
    export function downloadPlugin( url : string ) : number {
        console.log( `Repo ${url}` );
        console.log( "Lettura file configurazione: " );
        //Lettera file configurazione
        console.log(
            `- PATH : ${Module._PATH} \n` +
            `- EXPR_GIT : ${Module._EXPR_GIT}`
        );
        //Cattura il primo gruppo che corrisponde al nome del plugin
        var namePlugin : string = Module._EXPR_GIT.exec( url )[1];

        console.log( `Nome plugin : ${namePlugin}` );

        var code : number = 0;

        if ( namePlugin.length === 0 ) {
            //Uscita con codice d'errore generico
            code = 1;
        } else {
            //Comandi di download dal repo di git nella cartella plugins
            var cmd : Command.CommandI = new Command.CommandSync(
                'git', //Repository uso
                ['clone', url, Module._PATH + namePlugin]
            );

            code = cmd.exec(); //attendi la terminazione del comando
        }

        return code;
    };
}