/**
 * Esegue l'operazione di aggiornamento di un plugin. Al momento vengono
 * prelevati tutte le modifiche dal branch 'master' di un repo remoto.
 * @todo Da introdurre un sistema di gestione repo.
 *
 * Created by @korut94 on 10/02/16.
 */

/// <require path="../Command/CommandSync.ts" />
/// <require path="config.ts" />

const fs = require('fs');

module Module{
    /**
     * @param url {string} - URL del repo del plugin da aggiornare
     * @returns {number} - Codice d'uscita dell'aggiornamento
     */
    export function updatePlugin( url : string ) : number {
        console.log( `URL plugin: ${url}` );
        //Preleva la posizione del plugin
        var namePlugin = Module._EXPR_GIT.exec( url )[1];

        console.log( `Plugin trovato da aggiornare: ${namePlugin}` );

        var code : number = 0;

        //Controllo presenza del plugin
        try{
            console.log( `Stato ${Module._PATH + namePlugin}: ` );
            fs.accessSync( Module._PATH + namePlugin );
            console.log( "Presente" );
            console.log( "Inizio invio aggiornamenti..." );
            code = new Command.CommandSync(
                "git",
                ["-C", Module._PATH + namePlugin, "pull" ]
            ).exec();
        } catch ( err ) { //Plugin non presente o impossibile da leggere
            console.log( err.message );
            code = 128;
        }

        return code;
    }
}