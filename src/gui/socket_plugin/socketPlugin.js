'use strict';
// Per includere questo modulo e' necessario usare require( ./socket_plugin ).
// Nelle future versioni sara' necessario eliminare './' in quanto rende poco
// estendibile la struttura e non permette l'information hiding.


// Creiamo un canale d'ascolto con il nome del messaggio mandato.
// Essendo la coppia nome plugin e modulo univoci, il nome del canale
// sara' univocamente identificato.
function openChannel( callback ) {
    var idChannel = "id_"+(new Date()).getTime(); // Il tempo e' la soluzione?

    //Canale temporaneo in ascolto per il messaggio in arrivo dal main process.
    require( 'electron' ).ipcRenderer.once(
        idChannel,
        function ( event, message ) {
            callback( message );
    });

    return idChannel;
}

// Invio richiesta di download del plugin.
exports.download = function ( plugin, callback ) {
    // Creo il pacchetto
    var pack = new Object();
    pack.action = "download";
    pack.plugin = plugin;
    pack.channel = openChannel( callback );

    // Invio il messaggio al padre
    process.stdout.write( JSON.stringify( pack ) );
};

// Invio richiesta di rimozione del plugin.
exports.remove = function ( plugin, callback ) {
    // Creo il pacchetto
    var pack = new Object();
    pack.action = "remove";
    pack.plugin = plugin;
    pack.channel = openChannel( callback );

    // Invio il messaggio al padre
    process.stdout.write( JSON.stringify( pack ) );
};

// Invio richiesta di esecuzione modulo del plugin.
exports.run = function ( plugin, args, callback ) {
    if ( callback === undefined ) {
        // Se non sono stati specificati argomenti la callback si trova
        // nella variabile degli argomenti
        callback = args; // ORRIBILE!
        args = [];
    }

    var module = plugin;

    // Controllo se il plugin e' completo, con nome plugin seguito dal nome del
    // modulo separati con il carattere divisore ( '?' ) oppure si e' usata la
    // forma abbreviata con solo il nome del modulo. In quel caso al nome del
    // plugin viene dato quello assiociato alla variabile globale __plugin,
    // identificando il plugin attualmente in uso.
    if ( plugin.indexOf( '?' ) > -1 ) {

        // res[0] = Nome del plugin
        // res[1] = Nome del modulo
        var res = plugin.split( "?" );

        plugin = res[0];
        module = res[1];
    } else {
        plugin = __plugin;
    }

    // Creo il pacchetto
    var pack = new Object();
    pack.action = "run";
    pack.plugin = plugin;
    pack.module = module;
    pack.args = args;
    // Il nome del canale deve essere unico altrimenti si creerebbe
    // interferenza
    pack.channel = openChannel( callback );

    // Serializzo il pacchetto da inviare al processo padre
    process.stdout.write( JSON.stringify( pack ) );
};

exports.update = function ( plugin, callback ) {
    // Creo il pacchetto
    var pack = new Object();
    pack.action = "update";
    pack.plugin = plugin;
    pack.channel = openChannel( callback );

    // Invio il messaggio al padre
    process.stdout.write( JSON.stringify( pack ) );
};
