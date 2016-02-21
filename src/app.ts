/**
 * Start script to execute Chronos
 *
 * Created by amantova on 09/02/16.
 */

/// <reference path="Module/dl_plugin.ts" />
/// <reference path="Module/rm_plugin.ts" />
/// <reference path="Module/up_plugin.ts" />
/// <reference path="Module/run_plugin.ts" />
/// <reference path="pack/pack.ts" />

declare var require : any;

/**
 * @example Download and execute module
var code : number = Module.downloadPlugin(
    'git@github.com:korut94/pluginTest.git'
);

var [ris,code] = Module.runModule(
    'git@github.com:korut94/pluginTest.git',
    'print'
);
*/

const spawn = require( 'child_process' ).spawn;
const gui = spawn( 'electron', [ 'src/gui' ], {
    stdio : [
        'pipe', //Pipe di ricezione pacchetti dalla gui ( PMP <--- GUI )
        'pipe',
        'pipe',
        'pipe'  //Pipe di invio pacchetti alla gui ( PMP --> GUI )
    ]
});

gui.stdout.on( 'data', ( data ) => {
    // Questo e' uno stubs di come dovrebbe lavorare il plugin manager e sara'
    // eliminata una volta completato il plugin manager.

    console.log( `Parent received ${data}` );
    // Tutte le stringhe con le azioni da compiere
    if ( data.toString() !== 'idle' ) {
        var pack : Package.PackRe = JSON.parse( data.toString() );

        var values : Array<any> = pack.args;
        var sum = 0;
        for ( var i = 0; i < values.length; i++ ) {
            sum = sum + values[i];
        }

        var ris : number = sum;

        // Pacchetto leggero privato di ogni attributo non necessario per
        // eseguire la callback in attesa sul canale dedicato.
        var lightPack : Package.PackSe = new Package.PackSe(
            pack.channel,
            ris
        );

        // Serializza il nuovo pacchetto e rimandalo alla gui.
        gui.stdio[3].write( JSON.stringify( lightPack )  );
    } else if ( data.toString() === 'idle' ) {
        // Qui si crea una sorta di loop che termina quando la pipe è stata
        // chiusa. Ha senso????
        gui.stdio[3].write( 'idle' );
    }
});

gui.on( 'close', ( code ) => {
    console.log( `Gui process exited with code ${code}` );
});
