/**
 * Cancella il plugin specificato come repo.
 *
 * Created by @korut94 on 10/02/16.
 */

/// <require path="config.ts" />
/// <require path="../Command/CommandSync.ts" />

module Module{
    const fs = require( 'fs' );

    export function removePlugin( url : string ) : number {
        console.log( `URL : ${url}` );
        //Cattura il primo gruppo che corrisponde al nome del plugin
        var namePlugin : string = Module._EXPR_GIT.exec( url )[1];
        console.log(
            `Ottenimento stato cartella ${Module._PATH + namePlugin}: `
        );

        var code : number = 0;

        //Controllo ed eliminazione cartella se presente
        try{
            fs.accessSync( Module._PATH + namePlugin );
            console.log( "Plugin presente" );
            new Command.CommandSync(
                "rm",
                ["-rf", Module._PATH + namePlugin]
            ).exec();
            console.log( "Plugin rimosso" );
        } catch ( err ) { //Errore nell'accesso alla cartella del plugin
            console.log( err.message );
            code = 128;
        }

        return code;
    }
}